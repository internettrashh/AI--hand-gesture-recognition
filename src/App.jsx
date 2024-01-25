import React, { useRef , useEffect,useState} from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import './App.css';
import { drawHand } from './masks/Handmask';

function App() {
  const Webcamref = useRef(null);
  const canvasref = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const runhandpose = async () => {
    useEffect(() => {
      const net = async () => {
        await handpose.load();
        setModelLoaded(true);
      };
    
      loadModel();
    }, []);
    console.log('model load ho gaya ');
    setInterval(() => {
      detect(net);
    }, 100);
  };
  useEffect(() => {
    runhandpose();
  }, []);


  const detect = async (net) => {
    if(typeof Webcamref.current !== "undefined" && Webcamref.current !== null && Webcamref.current.video.readyState === 4){
     //get the video properties
      const video = Webcamref.current.video;
      const videoWidth = Webcamref.current.video.videoWidth;
      const videoHeight = Webcamref.current.video.videoHeight;

      //set video properties
      Webcamref.current.video.width = videoWidth;
      Webcamref.current.video.height = videoHeight;

      // doing same for canvas
      canvasref.current.width = videoWidth;
      canvasref.current.height = videoHeight;

      //making detections
      const hand = await net.estimateHands(video);
      if (hand == 0) {
        console.log("tera haat nai  dik raha ");}else{
          console.log("tera haat dik raha ");
        }

      //console.log(hand);
     

      // render the mesh 
      const ctx =  canvasref.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  return (
    
      <div  className='App'>
        <header className='App-header'>
          <h1>tera haat dik raa?</h1>
          {!modelLoaded && <h1>Waiting for the model to load...</h1>}
        
        <Webcam  ref={Webcamref} style={webcamstyle}/>
        <canvas
          ref={canvasref}
          style={webcamstyle} />
        </header>
      </div>
    
  );
}

const webcamstyle = {
  position: 'absolute',
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  left: 0,
  right: 0,
  textAlign: 'center',
  zindex: 9,
  width: 640,
  height: 480,
  transform: "scaleX(-1)"
};

export default App;
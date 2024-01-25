import React, { useRef , useEffect} from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import './App.css';

function App() {
  const Webcamref = useRef(null);
  const canvasref = useRef(null);
  const runhandpose = async () => {
    const net = await handpose.load();
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
      // const ctx =  canvasref.current.getContext("2d");
      // drawHand(hand, ctx);
    }
  };

  return (
    <>
      <div  className='App'>
        <header className='App-header'/>
          <h1>tera haat dik raa?</h1>
          <canvas ref={canvasref} style={webcamstyle}/>
        <Webcam  ref={Webcamref} style={webcamstyle}/>
      </div>
    </>
  );
}

const webcamstyle = {
  position: 'absolute',
  marginLeft: 'auto',
  marginRight: 'auto',
  left: 0,
  right: 0,
  textAlign: 'center',
  zindex: 9,
  width: 640,
  height: 480,
};

export default App;
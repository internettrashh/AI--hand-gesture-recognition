import React, { useRef , useEffect,useState} from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import './App.css';
import { drawHand } from './masks/Handmask';
import * as fp from 'fingerpose';
import fku from "./assets/fku.png";
import paper from "./assets/paper.png";
import rock from "./assets/rock.png";
import sizzorr from "./assets/sizzor.png";
import spock from "./assets/spock.png";
import thumbsup from "./assets/thumbsup.png";

function App() {
  const Webcamref = useRef(null);
  const canvasref = useRef(null);
  const [emoji,setemoji] = useState(null);
  const images = {thumbs_up:thumbsup,rock:rock,paper:paper,victory:sizzorr,spock:spock,fku:fku};
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
    //check data available???
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
      // if (hand == 0) {
      //   console.log("tera haat nai  dik raha ");}else{
      //     console.log("tera haat dik raha ");
      //   }

      //console.log(hand);
      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          // console.log(gesture.gestures);

          const confidence = gesture.gestures.map(
            (prediction) => prediction.score
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
           console.log(gesture.gestures[maxConfidence].name);
          setemoji(gesture.gestures[maxConfidence].name);
          //console.log(emoji);
        }
      }
      
     

      // render the mesh 
      const ctx =  canvasref.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  return (
    <>
      <div  className='App'>
        <header className='App-header'>
          <h1>tera haat dik raa?</h1>
        
        <Webcam  ref={Webcamref} style={webcamstyle}/>
        <canvas
          ref={canvasref}
          style={webcamstyle} />
          {setemoji !== null ? (
            <img src={images[emoji]} style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 400,
              bottom: 500,
              right: 0,
              textAlign: "center",
              height: 100,}} />
          ) : (
            ""
          )}
        </header>
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
  transform: "scaleX(-1)"
};

export default App;
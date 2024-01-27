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
import {PaperGesture} from './Fingagestures/Paperr'
import {victoryDescription} from './Fingagestures/Sizzor';
import { Rock } from './Fingagestures/Rock';

function App() {
  const Webcamref = useRef(null);
  const canvasref = useRef(null);
  const [emoji,setemoji] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const images = {thumbs_up:thumbsup,rock:rock,paper:paper,sizzor:sizzorr,spock:spock,fku:fku}; // to do: remove onused images
  const runhandpose = async () => {
    const net = await handpose.load();
    console.log('model load ho gaya ');
    setIsLoading(false);
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
          //fp.Gestures.VictoryGesture,
          victoryDescription,
          //fp.Gestures.ThumbsUpGesture,
           PaperGesture,
            Rock,
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 5);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          //console.log(gesture.gestures);

          const confidence = gesture.gestures.map(
            (prediction) => prediction.score
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          if (gesture.gestures && gesture.gestures.length > maxConfidence && gesture.gestures[maxConfidence]) {
          const playergesture = gesture.gestures[maxConfidence].name;
          console.log(playergesture);
           //console.log(gesture.gestures[maxConfidence].name);
          setemoji(gesture.gestures[maxConfidence].name);
          //console.log(emoji);
          }
        }
      }
      
     

      // render the mesh 
      const ctx =  canvasref.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  //TO DO : WORK ON THE GAME FUNCTION AFTER IMPLEMENTING CUSTOME HAND POSE
  // const playGame = (playerGesture) => {
  //   const computerGesture = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
  
  //   let result;
  //   if (playerGesture === computerGesture) {
  //     result = 'It\'s a tie!';
  //   } else if (
  //     (playerGesture === 'rock' && computerGesture === 'scissors') ||
  //     (playerGesture === 'scissors' && computerGesture === 'paper') ||
  //     (playerGesture === 'paper' && computerGesture === 'rock')
  //   ) {
  //     result = 'You win!';
  //   } else {
  //     result = 'You lose!';
  //   }
  
  //   setGameResult(result);
  // };



  return (
    <>
      <div  >
        <header className='App-header'>
        {isLoading ? <h1>Model load ho raha ruk</h1> : null}
          <h1>rock paper scissor bc</h1>
        
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
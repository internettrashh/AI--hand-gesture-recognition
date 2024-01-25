import React, { useRef } from 'react';
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
  };

  return (
    <>
      <div  className='App'>
        <header className='App-header'/>
          <h1>Hand Pose Detection</h1>
          <canvas ref={canvasref} style={webcamstyle}/>
        <Webcam  ref={Webcamref}style={webcamstyle}/>
      

      
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

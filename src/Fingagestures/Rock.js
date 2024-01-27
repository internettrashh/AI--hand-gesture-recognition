import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 


export const Rock = new GestureDescription('rock');

Rock.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
Rock.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
Rock.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.9);
Rock.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.9);


for(let finger of [Finger.Thumb,Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    Rock.addCurl(finger, FingerCurl.FullCurl, 1.0);
    Rock.addCurl(finger, FingerCurl.HalfCurl, 0.9);
  }


  // condition for index not fully down 

  Rock.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
  Rock.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
  Rock.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);
  Rock.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 


export const PaperGesture = new GestureDescription('paper');

for (let finger of [
    Finger.Thumb,
    Finger.Index,
    Finger.Middle,
    Finger.Ring,
    Finger.Pinky
]) {

    PaperGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}
for (let finger of [
    Finger.Index,
    Finger.Middle,
    Finger.Ring,
    Finger.Pinky
]) {

    //PaperGesture.addDirection(finger, FingerDirection.VerticalUp, 0.95);
    PaperGesture.addDirection(finger, FingerDirection.HorizontalLeft, 0.95);
    PaperGesture.addDirection(finger, FingerDirection.HorizontalRight, 0.95);
}

// Thumb
PaperGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.5);
PaperGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.5);


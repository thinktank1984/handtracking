import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import * as poseDetection from '@mediapipe/pose';

class HandSkeleton extends Component {
   constructor(props) {
      super(props);
      this.state = {
         landmarks: [],
      };
      this.webcamRef = React.createRef();
      this.canvasRef = React.createRef();
   }

   setRef = (webcam) => {
      this.webcamRef = webcam;
   };

   detectHand = async () => {
      const { poseLandmarks } = await poseDetection().estimateHands(
         this.webcamRef.current.video
      );
      if (poseLandmarks) {
         this.setState({ landmarks: poseLandmarks });
      }
      requestAnimationFrame(this.detectHand);
   };

   componentDidMount() {
      poseDetection().setOptions({
         detectionConfidence: 0.5,
         maxNumHands: 1,
      });
      this.detectHand();
   }

   drawHandLandmarks = () => {
      const canvas = this.canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = 640;
      canvas.height = 480;
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (this.state.landmarks.length > 0) {
         drawConnectors(
            context,
            this.state.landmarks,
            poseDetection().POSE_CONNECTIONS,
            { color: '#00FF00', lineWidth: 5 }
         );
         drawLandmarks(
            context,
            this.state.landmarks,
            { color: '#FF0000', lineWidth: 2 }
         );
      }
      requestAnimationFrame(this.drawHandLandmarks);
   };

   render() {
      return (
         <div>
            <Webcam
               audio={false}
               height={480}
               ref={this.setRef}
               screenshotFormat="image/jpeg"
               width={640}
            />
            <canvas
               style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1,
               }}
               width={640}
               height={480}
               ref={this.canvasRef}
            />
         </div>
      );
   }
}

export default HandSkeleton;

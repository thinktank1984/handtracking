import React, { Component } from "react";
import Webcam from "react-webcam";
import { Hands, HAND_CONNECTIONS } from "@mediapipe/hands/hands";
import {
  drawConnectors,
  drawLandmarks,
} from "@mediapipe/drawing_utils/drawing_utils";
import { Camera } from "@mediapipe/camera_utils/camera_utils";

class MPHands extends Component {
  constructor(props) {
    super(props);
    this.webcamRef = React.createRef();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    console.log(Hands.VERSION);
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.3.1626903359/${file}`;
      },
    });
    hands.setOptions({
      maxNumHands: 2,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    hands.onResults(this.onResults);

    if (
      typeof this.webcamRef.current !== "undefined" &&
      this.webcamRef.current !== null
    ) {
      const camera = new Camera(this.webcamRef.current.video, {
        onFrame: async () => {
          await hands.send({ image: this.webcamRef.current.video });
        },
        width: 1280,
        height: 720,
      });
      camera.start();
    }
  }

  onResults = (results) => {
    const videoWidth = this.webcamRef.current.video.videoWidth;
    const videoHeight = this.webcamRef.current.video.videoHeight;
    this.canvasRef.current.width = videoWidth;
    this.canvasRef.current.height = videoHeight;
    const canvasElement = this.canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
    canvasCtx.translate(videoWidth, 0);
    canvasCtx.scale(-1, 1);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5,
        });
        drawLandmarks(canvasCtx, landmarks, {
          color: "#FFFFFF",
          lineWidth: 2,
        });
      }
    }
    canvasCtx.restore();
  };

  render() {
    return (
      <div>
        <Webcam
          audio={false}
          mirrored={true}
          ref={this.webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: "0",
            right: "0",
            textAlign: "center",
            zIndex: 9,
            width: 800,
            height: 600,
          }}
        />
        <canvas
          ref={this.canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: "0",
            right: "0",
            textAlign: "center",
            zIndex: 9,
            width: 800,
            height: 600,
          }}
        ></canvas>
      </div>
    );
  }
}

export default MPHands;

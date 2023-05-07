"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const hands_1 = require("@mediapipe/hands/hands");
const drawing_utils_1 = require("@mediapipe/drawing_utils/drawing_utils");
const camera_utils_1 = require("@mediapipe/camera_utils/camera_utils");
class Handtracker extends react_1.Component {
    constructor() {
        super(...arguments);
        this.webcamRef = (0, react_1.createRef)();
        this.canvasRef = (0, react_1.createRef)();
        this.onResults = (results) => {
            var _a, _b, _c, _d;
            const videoWidth = (_b = (_a = this.webcamRef.current) === null || _a === void 0 ? void 0 : _a.video.videoWidth) !== null && _b !== void 0 ? _b : 0;
            const videoHeight = (_d = (_c = this.webcamRef.current) === null || _c === void 0 ? void 0 : _c.video.videoHeight) !== null && _d !== void 0 ? _d : 0;
            this.canvasRef.current.width = videoWidth;
            this.canvasRef.current.height = videoHeight;
            const canvasElement = this.canvasRef.current;
            const canvasCtx = canvasElement.getContext("2d");
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
            canvasCtx.translate(videoWidth, 0);
            canvasCtx.scale(-1, 1);
            canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
            if (results.multiHandLandmarks) {
                for (const landmarks of results.multiHandLandmarks) {
                    (0, drawing_utils_1.drawConnectors)(canvasCtx, landmarks, hands_1.HAND_CONNECTIONS, {
                        color: "#00FF00",
                        lineWidth: 5,
                    });
                    (0, drawing_utils_1.drawLandmarks)(canvasCtx, landmarks, {
                        color: "#FFFFFF",
                        lineWidth: 2,
                    });
                }
            }
            canvasCtx.restore();
        };
    }
    componentDidMount() {
        console.log(hands_1.Hands.VERSION);
        const hands = new hands_1.Hands({
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
        if (typeof this.webcamRef.current !== "undefined" &&
            this.webcamRef.current !== null) {
            const camera = new camera_utils_1.Camera(this.webcamRef.current.video, {
                onFrame: () => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    yield hands.send({ image: (_a = this.webcamRef.current) === null || _a === void 0 ? void 0 : _a.video });
                }),
                width: 1280,
                height: 720,
            });
            camera.start();
        }
    }
    render() {
        return audio = { false:  };
        mirrored = { true:  };
        ref = { this: .webcamRef };
        style = {};
        {
            position: "absolute",
                marginLeft;
            "auto",
                marginRight;
            "auto",
                left;
            "0",
                right;
            "0",
                textAlign;
            "center",
                zIndex;
            9,
                width;
            800,
                height;
            600,
            ;
        }
    }
}
/>
    < canvas;
ref = { this: .canvasRef };
style = {};
{
    position: "absolute",
        marginLeft;
    "auto",
        marginRight;
    "auto",
        left;
    "0",
        right;
    "0",
        textAlign;
    "center",
        zIndex;
    9,
        width;
    800,
        height;
    600,
    ;
}
    > /canvas>
    < /div>;
;
exports.default = Handtracker;

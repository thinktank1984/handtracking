"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandTracker = void 0;
const react_1 = __importStar(require("react"));
const react_webcam_1 = __importDefault(require("react-webcam"));
const hands_1 = require("@mediapipe/hands/hands");
const drawing_utils_1 = require("@mediapipe/drawing_utils/drawing_utils");
const camera_utils_1 = require("@mediapipe/camera_utils/camera_utils");
class HandTracker extends react_1.Component {
    constructor() {
        super(...arguments);
        this.webcamRef = (0, react_1.createRef)();
        this.canvasRef = (0, react_1.createRef)();
        this.onResults = (results) => {
            var _a, _b, _c, _d, _e, _f;
            let videoWidth = null;
            if (((_a = this.webcamRef.current) === null || _a === void 0 ? void 0 : _a.video) instanceof HTMLVideoElement) {
                videoWidth = (_c = (_b = this.webcamRef.current) === null || _b === void 0 ? void 0 : _b.video.videoWidth) !== null && _c !== void 0 ? _c : 0;
            }
            let videoHeight = null;
            if (((_d = this.webcamRef.current) === null || _d === void 0 ? void 0 : _d.video) instanceof HTMLVideoElement) {
                videoHeight = (_f = (_e = this.webcamRef.current) === null || _e === void 0 ? void 0 : _e.video.videoWidth) !== null && _f !== void 0 ? _f : 0;
            }
            //this.canvasRef.current!.width = videoWidth;
            if (this.canvasRef.current) {
                const width = videoWidth !== null && videoWidth !== void 0 ? videoWidth : 0;
                this.canvasRef.current.width = width;
            }
            if (this.canvasRef.current) {
                const height = videoHeight !== null && videoHeight !== void 0 ? videoHeight : 0;
                this.canvasRef.current.height = height;
            }
            const canvasElement = this.canvasRef.current;
            const canvasCtx = canvasElement.getContext("2d");
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, videoWidth !== null && videoWidth !== void 0 ? videoWidth : 0, videoHeight !== null && videoHeight !== void 0 ? videoHeight : 0);
            canvasCtx.translate(videoWidth !== null && videoWidth !== void 0 ? videoWidth : 0, 0);
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
                    const video = (_a = this.webcamRef.current) === null || _a === void 0 ? void 0 : _a.video;
                    if (video instanceof HTMLVideoElement) {
                        yield hands.send({ image: video });
                    }
                }),
                width: 1280,
                height: 720,
            });
            camera.start();
        }
    }
    render() {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(react_webcam_1.default, { audio: false, mirrored: true, ref: this.webcamRef, style: {
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: "0",
                    right: "0",
                    textAlign: "center",
                    zIndex: 9,
                    width: 800,
                    height: 600,
                } }),
            react_1.default.createElement("canvas", { ref: this.canvasRef, style: {
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: "0",
                    right: "0",
                    textAlign: "center",
                    zIndex: 9,
                    width: 800,
                    height: 600,
                } }, " ")));
    }
}
exports.HandTracker = HandTracker;
exports.default = HandTracker;

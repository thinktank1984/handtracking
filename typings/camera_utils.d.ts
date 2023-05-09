declare module "@mediapipe/camera_utils/camera_utils" {
   export interface CameraOptions {
      onFrame?: () => Promise<void>;
      width?: number;
      height?: number;
   }

   export class Camera {
      constructor(video: HTMLVideoElement, options?: CameraOptions);
      start(): void;
      stop(): void;
   }
}


/*
         const camera = new Camera(
            this.webcamRef.current.video as HTMLVideoElement,
            {
               onFrame: async () => {
                  await hands.send({ image: this.webcamRef.current?.video });
               },
            width: 1280,
            height: 720,
            });

*/
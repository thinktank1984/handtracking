declare module "@mediapipe/hands" {
   export class Hands {
      constructor(options?: HandsOptions);
      onResults: (results: HandsResult[]) => void;
      setOptions(options: HandsOptions): void;
      static readonly Solutions: {
         HANDS: string;
      }
   }

   export interface HandsOptions {
      maxNumHands?: number;
      minDetectionConfidence?: number;
      minTrackingConfidence?: number;
   }

   export interface HandsResult {
      handInViewConfidence: number;
      boundingBox: {
         topLeft: { x: number, y: number },
         bottomRight: { x: number, y: number }
      }
      landmarks: {
         x: number,
         y: number,
         z: number
      }[]
   }
}

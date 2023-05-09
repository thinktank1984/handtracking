declare module "@mediapipe/hands/hands" {
   export class Hands {
      constructor(options?: HandsOptionsConstructor);
      onResults: (results: Results) => void;
      
      setOptions(options: HandsOptions): void;
      static readonly VERSION: string;
      send: (input: { image: HTMLVideoElement | HTMLImageElement }) => Promise<void>;
      close: () => void;
      static readonly Solutions: {
         HANDS: string;
      }
   }

   export interface HandsOptionsConstructor {

      locateFile: (path: string) => string;

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
   export const HAND_CONNECTIONS: ReadonlyArray<[number, number]>;

}

declare module "@mediapipe/drawing_utils/drawing_utils" {
   export function drawConnectors(
      ctx: CanvasRenderingContext2D,
      landmarks: number[][],
      connections: ReadonlyArray<[number, number]>,
      options?: {
         color?: string;
         lineWidth?: number
      }
   ): void;

   export function drawLandmarks(
      ctx: CanvasRenderingContext2D,
      landmarks: number[][],
      
      options?: {
         color?: string;
         lineWidth?: number
      }
   ): void;
}

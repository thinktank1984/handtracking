declare module "@mediapipe/drawing_utils/drawing_utils" {
   export function drawConnectors(
      landmarks: number[][],
      connections: ReadonlyArray<[number, number]>,
      ctx: CanvasRenderingContext2D,
      options?: { color?: string; lineWidth?: number }
   ): void;

   export function drawLandmarks(
      landmarks: number[][],
      ctx: CanvasRenderingContext2D,
      options?: { color?: string; fillColor?: string; radius?: number }
   ): void;
}

declare module "@mediapipe/camera_utils/camera_utils" {
   export function computeCameraIntrinsicsFromMatrix(matrix: number[][]): {
      focalLength: ReadonlyArray<number>;
      principalPoint: ReadonlyArray<number>;
      imageDimension: ReadonlyArray<number>;
      radialDistortion: ReadonlyArray<number>;
      tangentialDistortion: ReadonlyArray<number>;
   };
   export class Camera {
      constructor(focalLength: number[], principalPoint: number[], imageDimension: number[]);
      projectPoint(pt: number[], rtMatrix: number[][]): number[];
      getImageSize(): number[];
   }
   export function computeRotation(angle: number, axis: number[]): number[][];

   export function computeTranslation(t: number[]): number[][];

   export function transformPoint(pt: number[], matrix: number[][]): number[];
}

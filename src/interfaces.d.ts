export interface IGameFieldSize {
  w: number;
  h: number;
}

export interface IShapeModel {
  x: number;
  y: number;
  id: string;
  multiplier: number;
  buttonMode?: boolean;
  path?: number[];
  radius?: number;
  rotation?: number;
  index: number;
}

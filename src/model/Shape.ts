import * as PIXI from 'pixi.js';
import { IShapeModel } from '../interfaces';
import { EnumType } from '../enums';

export default class ShapeModel extends PIXI.Graphics {
  public readonly id: string;
  public area: number;
  public buttonMode: boolean;
  public override path;
  public readonly multiplier: number;
  public type: string;

  public getOccupiedArea: (area?: number) => number = (area) =>  {
    return area ?? 0;
  };

  public getShapeType: (type?: EnumType) => string = (type) => {
    return type ?? EnumType.DEFAULT_TYPE;
  };

  constructor(options: IShapeModel) {
    super();
    this.id = options.id;
    this.x = options.x;
    this.y = options.y;
    this.interactive = true;
    this.buttonMode = true;
    this.multiplier =
      options.index === 5 || options.index === 4
        ? options.multiplier > 0.5
          ? options.multiplier
          : 1
        : options.multiplier;
    this.type = this.getShapeType();
    this.area = this.getOccupiedArea();
  }
}

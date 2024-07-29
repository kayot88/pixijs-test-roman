import {
  shapesCount,
  occupiedArea,
  shapesPerSecond,
  calculatedGravity,
  lessShapes,
  moreShapes,
  lessGravity,
  moreGravity,
} from '../constants';
import { EnumType } from '../enums';
import { ShapesType } from '../types';

export default class ShapeView {
  private areaOccupied: number;

  private shapesNumber: number;

  constructor() {
    this.areaOccupied = 0;
    this.shapesNumber = 0;

    this.updateInfo = this.updateInfo.bind(this);
  }

  public bindControls(changeGravity: (value: number) => void, changeShapesCount: (value: number) => void): void {
    lessGravity.addEventListener(EnumType.CLICK, changeGravity.bind(this, -1));
    moreGravity.addEventListener(EnumType.CLICK, changeGravity.bind(this, 1));
    lessShapes.addEventListener(EnumType.CLICK, changeShapesCount.bind(this, -1));
    moreShapes.addEventListener(EnumType.CLICK, changeShapesCount.bind(this, 1));
  }

  public updateInfo(gravity: number, shapesPerSec: number, shapes): void {
    lessGravity.disabled = gravity < 1;
    lessShapes.disabled = shapesPerSec < 1;
    this.shapesNumber = shapes.length;
    this.areaOccupied = shapes.reduce((acc: number, shape) => acc + shape.area, 0);
    shapesPerSecond.innerHTML = shapesPerSec.toString();
    calculatedGravity.innerHTML = gravity.toString();
    shapesCount.innerHTML = this.shapesNumber.toString();
    occupiedArea.innerHTML = this.areaOccupied.toFixed(2).toString();
  }
}

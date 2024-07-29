import { randomColor } from '../utils';
import { minShapeSize, multiplyEllipseSize } from '../constants';
import Shape from './Shape';
import { IShapeModel } from '../interfaces';
import { EnumType } from '../enums';

export default class Ellipse extends Shape {
  private readonly sizeX: number;
  private readonly sizeY: number;
  constructor(options: IShapeModel) {
    super(options);
    this.sizeX = minShapeSize + this.multiplier * multiplyEllipseSize;
    this.sizeY = minShapeSize + (this.multiplier * multiplyEllipseSize) / 2;
    this.ellipse(0, -this.sizeY / 2, this.sizeX, this.sizeY);
    this.fill(randomColor());
    this.type = this.getShapeType();
    this.area = this.getOccupiedArea();
  }
  override getOccupiedArea = () =>
    Math.PI *
    (minShapeSize + this.multiplier * multiplyEllipseSize) *
    (minShapeSize + (this.multiplier * multiplyEllipseSize) / 2);

  override getShapeType = () => EnumType.ELLIPSE;
}

import { minShapeSize } from '../constants';
import { randomColor } from '../utils';
import Shape from './Shape';
import { IShapeModel } from '../interfaces';
import { EnumType } from '../enums';

export default class Rectangle extends Shape {
  private readonly sizeX: number;
  private readonly sizeY: number;
  constructor(options: IShapeModel) {
    super(options);
    this.sizeX = minShapeSize + 100 * this.multiplier;
    this.sizeY = minShapeSize + 100 * this.multiplier;
    this.rect(0, -this.sizeY, this.sizeX, this.sizeY);
    this.fill(randomColor());
    this.type = this.getShapeType();
    this.area = this.getOccupiedArea();
  }
  override getOccupiedArea = () => (minShapeSize + 100 * this.multiplier) ** 2;
  override getShapeType = () => EnumType.RECTANGLE;
}

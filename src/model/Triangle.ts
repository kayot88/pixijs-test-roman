import { minShapeSize } from '../constants';
import { randomColor } from '../utils';
import Shape from './Shape';
import { IShapeModel } from '../interfaces';
import { EnumType } from '../enums';

export default class Triangle extends Shape {
  private readonly sizeX: number;
  private readonly sizeY: number;
  constructor(options: IShapeModel) {
    super(options);
    this.sizeX = this.multiplier * 100 + minShapeSize;
    this.sizeY = this.multiplier * 100 + minShapeSize;
    this.poly([-this.sizeX / 2, -this.sizeY, this.sizeX / 2, -this.sizeY, 0, 0]);
    this.fill(randomColor());
    this.type = this.getShapeType();
    this.area = this.getOccupiedArea();
  }
  override getOccupiedArea = () => (this.multiplier * 100 + minShapeSize) ** 2 / 2;
  override getShapeType = () => EnumType.TRIANGLE;
}


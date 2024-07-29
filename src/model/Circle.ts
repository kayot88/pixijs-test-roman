import { randomColor } from '../utils';
import Shape from './Shape';
import { IShapeModel } from '../interfaces';
import { multiplyCircleSize, minShapeSize } from '../constants';
import { EnumType } from '../enums';

export default class Circle extends Shape {
  private readonly radius: number;

  constructor(options: IShapeModel) {
    super(options);
    this.radius = minShapeSize + multiplyCircleSize * this.multiplier;
    this.circle(0, -this.radius, this.radius);
    this.fill(randomColor());
    this.type = this.getShapeType();
    this.area = this.getOccupiedArea();
  }
  override getOccupiedArea = () => (this.area = Math.PI * this.radius ** 2);
  override getShapeType = () => EnumType.CIRCLE;
}

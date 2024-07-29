import { randomColor } from '../utils';
import Shape from './Shape';
import { IShapeModel } from '../interfaces';
import { EnumType } from '../enums';

export default class Hexagon extends Shape {
  public override readonly path: number[];
  constructor(options: IShapeModel) {
    super(options);
    this.path = [0, 0, 45, -25, 45, -75, 0, -100, -45, -75, -45, -25];
    this.poly(this.path.map((el) => el * this.multiplier));
    this.fill(randomColor());
    this.type = this.getShapeType();
    this.area = this.getOccupiedArea();
  }
  override getOccupiedArea = () => (50 * this.multiplier * 2 * 6 * (50 / Math.sqrt(3))) / 2;
  override getShapeType = () => EnumType.HEXAGON;
}

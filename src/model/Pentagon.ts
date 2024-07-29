import { randomColor } from '../utils';
import Shape from './Shape';
import { IShapeModel } from '../interfaces';
import { EnumType } from '../enums';

export default class Pentagon extends Shape {
  public override readonly path: number[];
  constructor(options: IShapeModel) {
    super(options);
    this.path = [-29, 0, 29, 0, 45, -55, 0, -90, -45, -55];
    this.poly(this.path.map((el) => el * this.multiplier));
    this.fill(randomColor());
    this.type = this.getShapeType();
    this.area = this.getOccupiedArea();
  }
  override getOccupiedArea = () => (45 * (58 * this.multiplier * 5)) / 2;
  override getShapeType = () => EnumType.PENTAGON;
}

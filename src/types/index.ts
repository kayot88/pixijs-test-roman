import Circle from "../model/Circle";
import Ellipse from "../model/Ellipse";
import Rectangle from "../model/Rectangle";
import Triangle from "../model/Triangle";
import Hexagon from '../model/Hexagon';
import Pentagon from "../model/Pentagon";

export type ShapesType = Circle | Rectangle | Ellipse | Triangle | Hexagon | Pentagon;

export type ShapesArrayType = (
  | typeof Circle
  | typeof Rectangle
  | typeof Ellipse
  | typeof Triangle
  | typeof Hexagon
  | typeof Pentagon
)[];



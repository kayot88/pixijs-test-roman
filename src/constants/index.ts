import { EnumType } from '../enums';
import { IGameFieldSize } from '../interfaces';
import Circle from '../model/Circle';
import Ellipse from '../model/Ellipse';
import Hexagon from '../model/Hexagon';
import Pentagon from '../model/Pentagon';
import Rectangle from '../model/Rectangle';
import Triangle from '../model/Triangle';

export const gameDimensions: IGameFieldSize = {
  w: 1200,
  h: 800,
};

export const minShapeSize = 40;
export const multiplyCircleSize = 30;
export const multiplyEllipseSize = 60;
export const multiplyRandomShapeSize = 50;

export const shapesArray = [Circle, Rectangle, Ellipse, Triangle, Hexagon, Pentagon];

export const shapesCount = document.querySelector(`${EnumType.CURRENT_SHAPES} span`) as HTMLSpanElement;

export const occupiedArea = document.querySelector(`${EnumType.OCCUPIED_SHAPES} span`) as HTMLSpanElement;

export const shapesPerSecond = document.querySelector(`${EnumType.SHAPES_INFO} span`) as HTMLSpanElement;

export const calculatedGravity = document.querySelector(`${EnumType.GRAVITY_INFO} span`) as HTMLSpanElement;

export const lessShapes = document.querySelector(EnumType.LESS_SHAPES) as HTMLButtonElement;

export const moreShapes = document.querySelector(EnumType.MORE_SHAPES) as HTMLButtonElement;

export const lessGravity = document.querySelector(EnumType.LESS_GRAVITY) as HTMLButtonElement;

export const moreGravity = document.querySelector(EnumType.MORE_GRAVITY) as HTMLButtonElement;

export const gameCanvas = document.getElementById(EnumType.CANVAS) as HTMLDivElement;

export const explosionAnimation = 'https://pixijs.com/assets/spritesheet/mc.json';

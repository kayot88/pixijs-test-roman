import { Application, Assets } from 'pixi.js';
import AppModel from './model/App';
import ShapeView from './view/View';
import ShapeController from './controller/ControllerShapes';
import { explosionAnimation, gameDimensions } from './constants';

export const app = new Application();
await Assets.load(explosionAnimation);

await app.init({ width: gameDimensions.w, height: gameDimensions.h });
const view: ShapeView = new ShapeView();
const model: AppModel = new AppModel();
const controller: ShapeController = new ShapeController(model, view);
controller.init();

import * as PIXI from 'pixi.js';
import { gameDimensions, shapesArray } from '../constants';
import AppModel from '../model/App';
import ShapeView from '../view/View';
import { randomShapeIndex } from '../utils';
import { sound } from '@pixi/sound';
import { EnumType } from '../enums';

export default class ControllerShape {
  private view: ShapeView;

  private model: AppModel;

  private renderCounter: number;

  private shapesPerSec: number;

  constructor(model: AppModel, view: ShapeView) {
    this.view = view;
    this.model = model;
    this.renderCounter = 0;
    this.shapesPerSec = 1;

    this.newShapeFactory = this.newShapeFactory.bind(this);
    this.changeGravity = this.changeGravity.bind(this);
    this.changeShapesCount = this.changeShapesCount.bind(this);
  }

  public init(): void {
    const { gameFieldConfig, gravity, shapesPerSec, shapes } = this.model;

    const { bindControls, updateInfo } = this.view;
    gameFieldConfig(this.newShapeFactory);
    bindControls(this.changeGravity, this.changeShapesCount);
    updateInfo(gravity, shapesPerSec, shapes);
    this.addTicker();
    sound.add(EnumType.WAVES_SOUND, 'utils/waves.mp3').volume = 0.1;
    sound.play(EnumType.WAVES_SOUND, { loop: true });
  }

  private changeGravity(value: number): void {
    this.model.gravity += value;
  }

  private changeShapesCount(value: number): void {
    this.model.shapesPerSec += value;
  }

  private newShapeFactory(x: number, y: number): void {
    const index: number = randomShapeIndex(shapesArray.length);
    const id: string = Date.now().toString();
    const multiplier: number = Math.random();
    this.model.createShape({ x, y, id, multiplier, index }, index);
  }

  private generateShapes(shouldGenerate: boolean): void {
    if (shouldGenerate) {
      this.newShapeFactory(Math.ceil(Math.random() * gameDimensions.w), 0);
    }
  }

  private updateShapes(): void {
    const { updateGravity, removeShapeOutOfStage, updateWithScale, shapesPerSec, shapes, gravity } = this.model;
    updateGravity();
    updateWithScale();
    removeShapeOutOfStage();
    this.shapesPerSec = shapesPerSec;
    this.view.updateInfo(gravity, shapesPerSec, shapes);
  }

  private addTicker(): void {
    let ticker = PIXI.Ticker.shared;
    const { deltaMS } = ticker;
    const oneFrameTime: number = deltaMS;
    let shouldGenerate: boolean;
    ticker.add(() => {
      shouldGenerate = (this.renderCounter * oneFrameTime) % (1000 / this.shapesPerSec) < oneFrameTime;
      this.generateShapes(shouldGenerate);
      this.updateShapes();

      this.renderCounter += 1;
    });
  }
}

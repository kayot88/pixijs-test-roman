import { app } from '../index';
import { AnimatedSprite, Application, Rectangle, Texture } from 'pixi.js';
import { gameDimensions, shapesArray } from '../constants';
import { EnumType } from '../enums';
import { IShapeModel } from '../interfaces';
import { sound } from '@pixi/sound';
import { ShapesArrayType, ShapesType } from '../types';

export default class AppModel {
  private shapeClasses: Omit<ShapesArrayType, 'RandomShape'>;
  private count = 0;
  public shapes: ShapesType[] = [];
  public gravity: number;
  public shapesPerSec: number;
  public app: Application;
  private explosionTextures: Texture[];
  private explosion: AnimatedSprite;
  constructor() {
    this.shapeClasses = shapesArray;
    this.shapes = [];
    this.gravity = 1;
    this.shapesPerSec = 1;
    this.app = app;
    this.explosionTextures = [];
    this.gameFieldConfig = this.gameFieldConfig.bind(this);
    this.updateGravity = this.updateGravity.bind(this);
    this.updateWithScale = this.updateWithScale.bind(this);
    this.removeShapeOutOfStage = this.removeShapeOutOfStage.bind(this);
    let i: number;
    for (i = 0; i < 26; i++) {
      const texture = Texture.from(`${EnumType.EXPLOSION} ${i + 1}.png`);
      this.explosionTextures.push(texture);
    }
    this.explosion = new AnimatedSprite(this.explosionTextures);
    sound.add('explosion', 'utils/fireshow.mp3').volume = 0.5;
  }

  public gameFieldConfig(newShapeFactory: (x: number, y: number) => void) {
    const { canvas, stage } = this.app;
    document.getElementById(EnumType.CANVAS)?.appendChild(canvas);

    stage.hitArea = new Rectangle(0, 0, gameDimensions.w, gameDimensions.h);
    stage.interactive = true;

    stage.on(EnumType.CLICK, (e) => {
      const randomIndex = Math.floor(Date.now() * Math.random());
      sound.add(`produced_${randomIndex}`, 'utils/produce.mp3').volume = 0.5;
      sound.play(`produced_${randomIndex}`);

      newShapeFactory(e.data.global.x, e.data.global.y);
      setTimeout(() => {
        sound.remove(`produced_${randomIndex}`);
      }, 1000);
    });
  }

  private changeShapesColor(item: ShapesType): void {
    const sameShapes = this.shapes.filter((el: ShapesType) => el.id !== item.id && item.type === el.type);

    sameShapes.forEach((el: ShapesType) => {
      const { x, y, id, constructor, multiplier, type } = el;
      this.deleteShape(el);
      const index: number = this.shapeClasses.findIndex((shapeModel) => constructor.name === shapeModel.name);
      this.createShape(
        {
          x,
          y,
          id,
          multiplier,
          index,
        },
        index
      );
    });
  }

  public createShape(options: IShapeModel, index: number): void {
    const { stage } = this.app;
    const shape = this.shapeClasses[index] && new this.shapeClasses[index](options);
    shape?.on &&
      shape.on(EnumType.CLICK, (e: MouseEvent) => {
        e.stopPropagation();
        this.explosion.x = shape.x;
        this.explosion.y = shape.y;
        this.explosion.anchor.set(0.5);
        this.explosion.rotation = Math.random() * Math.PI;
        this.explosion.scale.set(0.75 + Math.random() * 0.5);
        stage.addChild(this.explosion);
        this.explosion.play();
        sound.play('explosion');
        setTimeout(() => {
          this.explosion.stop();
          stage.removeChild(this.explosion);
        }, 400);
        this.deleteShapeByClick(shape);
      });
    stage.addChild(shape);
    this.shapes.push(shape);
  }

  private deleteShapeByClick(item: ShapesType): void {
    this.deleteShape(item);
    this.changeShapesColor(item);
  }

  public updateGravity(): void {
    this.shapes.forEach((el) => {
      el.y += this.gravity;
    });
  }

  public updateWithScale(): void {
    this.shapes.forEach((el) => {
      el.scale.x = 1 + Math.sin(this.count) * 0.06;
      el.scale.y = 1 + Math.cos(this.count) * 0.04;
      this.count += 0.001;
    });
  }

  private deleteShape(shape: ShapesType): void {
    const { stage } = this.app;
    stage.removeChild(shape);
    const index: number = this.shapes.findIndex((el) => el.id === shape.id);
    this.shapes.splice(index, 1);
  }

  public removeShapeOutOfStage(): void {
    for (let i = 0; i <= this.shapes.length; i += 1) {
      if (this.shapes[i]?.y > gameDimensions.h + this.shapes[i]?.height) {
        this.deleteShape(this.shapes[i]);
      }
    }
  }
}

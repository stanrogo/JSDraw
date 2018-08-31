/**
 * @file main.ts
 * @description Main launching functionality of the application
 * @author Stanley Clark <me@stanrogo.com>
 * @version 0.0.1
 */

import '../styles/main.scss';

import Canvas from './canvas/canvas';
import CanvasCoordinates from "./interfaces/CanvasCoordinates";
import DrawArea from "./canvas/drawArea";
import ClassShape from "./canvas/shapes/classShape";
import ClassBuilder from "./classBuilder/classBuilder";

// Create all initial canvas items
const canvas: Canvas = new Canvas();
const drawArea: DrawArea = new DrawArea(canvas.ctx);
const classLoc: CanvasCoordinates = {left: 5, top: 5, width: 100, height: 100};
const classShape: ClassShape = new ClassShape(canvas.ctx, classLoc);

// Activate subscriptions for all canvas items
canvas.subscribeDrawArea(drawArea);
canvas.subscribeItem(classShape);

// Perform the initial draw
canvas.draw();

// Generate code from the information stored in the model
const classBuilder: ClassBuilder = new ClassBuilder(classShape.classProps);
const code = classBuilder.generateCode();
console.log(code);

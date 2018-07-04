/**
 * @file main.ts
 * @description Main launching functionality of the application
 * @author Stanley Clark <me@stanrogo.com>
 * @version 0.0.1
 */

import '../styles/main.scss';

import Canvas from './canvas';
import DrawArea from "./draw_areas/DrawArea";
import ToolPanel from "./draw_areas/ToolPanel";

import CanvasCoordinates from "./interfaces/CanvasCoordinates";

/**
 * Initialise the canvas, which contains the main context
 * @type {Canvas}
 */
const canvas = new Canvas();

// Add main draw area and toolbox
const mainCoordinates : CanvasCoordinates = { left: 0, top: 0, width: 90, height: 100 };
const toolCoordinates : CanvasCoordinates = { left: 90, top: 0, width: 10, height: 100 };
const mainDrawArea: DrawArea = canvas.addDrawArea(mainCoordinates);
const toolPanel: ToolPanel = canvas.addDrawArea(toolCoordinates, 'ToolPanel');

// Add shapes to the panels
// TODO: add interface providing ability to only specify left and top props
const classLoc : CanvasCoordinates = { left: 5, top: 5, width: 100, height: 100 };
mainDrawArea.addShape('class', classLoc);
toolPanel.addShape('class', classLoc);

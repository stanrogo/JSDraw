/**
 * @file canvas.ts
 * @description Describes a particular section of the canvas.
 * @author Stanley Clark <me@stanrogo.com>
 * @version 0.0.1
 *
 * A draw area is a particular section of the canvas
 * that has its own self contained functionality.
 *
 * Draw areas are also able to send and receive events
 * that items have been dragged across individual draw area boundaries
 */

import CanvasCoordinates from "../interfaces/CanvasCoordinates";
import CanvasSection from "../interfaces/CanvasSection";
import Shape from "../shapes/shape";
import ClassShape from "../shapes/classShape";

class DrawArea implements CanvasSection{
	private readonly ctx: CanvasRenderingContext2D;
	private locationPercentage: CanvasCoordinates;
	private location: CanvasCoordinates;
	private shapes: Shape[];

	/**
	 * Constructor
	 * @param {CanvasCoordinates} location Coordinates of draw area position
	 * @param {CanvasRenderingContext2D} ctx Main Canvas Rendering Context
	 */
	constructor(location: CanvasCoordinates, ctx: CanvasRenderingContext2D){
		this.ctx = ctx;
		this.locationPercentage = location;
		this.location = this.percentToAbsolute();
		this.shapes = [];
	}

	/**
	 * Draw the bounding box of the draw area and all its shapes
	 */
	public draw(): void{
		this.ctx.fillStyle = "#FAF7F8";
		this.ctx.beginPath();
		this.ctx.rect(this.location.left,this.location.top,this.location.width,this.location.height);
		this.ctx.fill();
		this.ctx.fillStyle = "#000000";
		this.ctx.stroke();
		this.ctx.closePath();

		this.shapes.forEach(shape => shape.draw());
	}

	/**
	 * Convert location in percentages to one in absolute CanvasCoordinates
	 * @returns {CanvasCoordinates}
	 */
	private percentToAbsolute(): CanvasCoordinates{
		const canvasWidth = this.ctx.canvas.width;
		const canvasHeight = this.ctx.canvas.height;

		return {
			left: (this.locationPercentage.left / 100) * canvasWidth,
			top: (this.locationPercentage.top / 100) * canvasHeight,
			width: (this.locationPercentage.width / 100) * canvasWidth,
			height: (this.locationPercentage.height / 100) * canvasHeight,
		}
	}

	/**
	 * Add a single shape to the draw area
	 * @param {string} type Type of shape to add
	 * @param {CanvasCoordinates} shapeLocation The relative location on the canvas
	 */
	public addShape(type: string, shapeLocation: CanvasCoordinates): void{
		// First translate the relative coordinates to absolute coordinates
		shapeLocation.left += this.location.left;
		shapeLocation.top += this.location.top;

		// Then create a new shape
		let shape: Shape;
		switch (type){
			case 'class':
				shape = new ClassShape(this.ctx, shapeLocation);
				break;
			default:
				throw new Error('Shape type not yet supported');
		}

		// Then draw and add the shape
		shape.draw();
		this.shapes.push(shape);
	}

	public doubleClick(e): void{
		this.shapes.forEach(shape => shape.doubleClick(e));
	};

	public mousedown(e): void{
		this.shapes.forEach(shape => shape.mouseDown(e));
	};

	public mousemove(e): void{
		this.shapes.forEach(shape => shape.mouseMove(e));
	}

	public mouseup(e): void{ };

	public resize(): void {
		this.location = this.percentToAbsolute();
	};
}

export default DrawArea;
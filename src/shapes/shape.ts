/**
 * @file shape.ts
 * @description Abstract interpretation of a shape on the canvas.
 * @author Stanley Clark <me@stanrogo.com>
 * @version 0.0.1
 */
import CanvasCoordinates from '../interfaces/CanvasCoordinates';

abstract class Shape {
	protected ctx: CanvasRenderingContext2D;
	protected x: number; // Left coordinate of shape
	protected y: number; // Top coordinate of shape
	private clickX: number;
	private clickY: number;

	protected constructor(ctx: CanvasRenderingContext2D, location: CanvasCoordinates){
		this.ctx = ctx;
		this.x = location.left;
		this.y = location.top;
	}

	abstract draw(): void;

	abstract doubleClick(e): void;

	/**
	 * Check if the mouse is in shape and if so set x and y properties
	 * @param {MouseEvent} e
	 */
	public mouseDown(e: MouseEvent): void {
		if (!this.mouseInShape(e)) return null;
		this.setClickDifference(e);
		this.mouseMove(e);
	}

	/**
	 * Check if mouse in shape and perform move event
	 * @param {MouseEvent} e
	 */
	public mouseMove(e: MouseEvent): void {
		if (!this.mouseInShape(e)) return null;
		this.x = e.pageX - this.clickX;
		this.y = e.pageY - this.clickY;
	}

	/**
	 * Evaluate expression to check if mouse cursor is inside shape
	 * @param {MouseEvent} e
	 * @returns {boolean}
	 */
	protected mouseInShape(e: MouseEvent): boolean {
		const checkRight: boolean = e.pageX < this.x + 100 + 8;
		const checkLeft: boolean = e.pageX > this.x + 8;
		const checkBottom: boolean = e.pageY < this.y + 8 + 120;
		const checkTop: boolean = e.pageY > this.y + 8;

		return checkBottom && checkTop && checkRight && checkLeft;
	}

	/**
	 * Set the offset from the top left of the shape
	 * @param {MouseEvent} e
	 */
	private setClickDifference(e: MouseEvent): void {
		this.clickX = e.pageX - this.x;
		this.clickY = e.pageY - this.y;
	}
}

export default Shape;

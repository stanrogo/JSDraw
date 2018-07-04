/**
 * @file classShape.ts
 * @description A UML Class shape implementation
 * @author Stanley Clark <me@stanrogo.com>
 * @version 0.0.1
 */

import Shape from './shape';
import CanvasCoordinates from '../interfaces/CanvasCoordinates';

class ClassShape extends Shape {
	className: string;
	classNameInput: HTMLInputElement;

	constructor(ctx: CanvasRenderingContext2D, location: CanvasCoordinates){
		super(ctx, location);
		this.className = '';
		this.classNameInput = null;
	}

	/**
	 * Additionally to normal behaviour, remove any present input
	 * @param {MouseEvent} e
	 */
	mouseDown(e): void {
		if(this.classNameInput) this.removeInput();
		super.mouseDown(e);
	}

	/**
	 * Add an input to the DOM to allow the user to enter a class name
	 * @param {MouseEvent} e
	 */
	doubleClick(e: MouseEvent): void {
		if (!this.mouseInShape(e)) return;

		const input = document.createElement('input');
		input.type = 'text';
		input.className = 'floating-input';
		input.autofocus = true;
		input.style.left = `${e.pageX}px`;
		input.style.top = `${e.pageY}px`;
		input.addEventListener('keydown', (e) => {
			if(e.key === 'Enter'){
				this.removeInput();
				this.draw();
			}
		});
		document.body.appendChild(input);
		this.classNameInput = input;
	}

	/**
	 * Remove the input box from the DOM
	 */
	removeInput(): void {
		this.className = this.classNameInput.value;
		this.classNameInput.parentNode.removeChild(this.classNameInput);
		this.classNameInput = null;
	}

	/**
	 * Draw the three class sections and text properties
	 */
	draw(): void {
		this.ctx.fillStyle = "#FFFFFF";
		this.ctx.beginPath();
		this.ctx.rect(this.x, this.y, 100, 120);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.fillStyle = "#000000";
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.moveTo(this.x, this.y + 40);
		this.ctx.lineTo(this.x + 100, this.y + 40);
		this.ctx.stroke();
		this.ctx.closePath();

		this.ctx.beginPath();
		this.ctx.moveTo(this.x, this.y + 80);
		this.ctx.lineTo(this.x + 100, this.y + 80);
		this.ctx.stroke();
		this.ctx.closePath();

		this.drawClassName();
	}

	/**
	 * If the class has a name, draw the name
	 */
	drawClassName(): void {
		if(!this.className) return;
		this.ctx.fillStyle = "blue";
		this.ctx.font = "bold 16px Arial";
		this.ctx.fillText(this.className, this.x + 10, this.y + 16 + 8);
	}
}

export default ClassShape;

/**
 * @file canvas.ts
 * @description main class responsible for management of overall context.
 * @author Stanley Clark <me@stanrogo.com>
 * @version 0.0.1
 */

import DrawArea from "./draw_areas/DrawArea";
import CanvasCoordinates from "./interfaces/CanvasCoordinates";
import ToolPanel from "./draw_areas/ToolPanel";

class Canvas {
	private canvas: HTMLCanvasElement;
	private readonly ctx: CanvasRenderingContext2D;
	private drawAreas: DrawArea[];
	private width: number;
	private height: number;
	private lastClickTime: number;
	private drawInterval: number;

	constructor(){
		this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.drawAreas = [];
		this.width = null;
		this.height = null;
		this.lastClickTime = 0;
		this.drawInterval = null;
		this.canvas.onmousemove = null;
		this.canvas.onmousedown = this.mouseDown.bind(this);
		this.canvas.onmouseup = this.mouseUp.bind(this);
		this.canvas.onclick = this.click.bind(this);
		window.onresize = this.resize.bind(this);

		this.resize();
	}

	/**
	 * Add a single draw area to the canvas
	 * @param {CanvasCoordinates} coordinates
	 * @param {string} [subType]
	 * @returns {DrawArea}
	 */
	public addDrawArea(coordinates: CanvasCoordinates, subType?: string): DrawArea{
		let drawArea: DrawArea;

		switch (subType){
			case 'ToolPanel':
				drawArea = new ToolPanel(coordinates, this.ctx);
				break;
			default:
				drawArea = new DrawArea(coordinates, this.ctx);
				break;
		}

		drawArea.draw();
		this.drawAreas.push(drawArea);

		return drawArea;
	}

	/**
	 * Draw at regular intervals on mouse down
	 * @param {MouseEvent} me
	 */
	private mouseDown(me: MouseEvent): void{

		// Notify about mouse down event occurrence
		this.drawAreas.forEach(x => x.mousedown(me));

		// Bind mouse move event to draw every mouse move
		this.drawInterval = window.setInterval(this.draw.bind(this), 10);

		this.canvas.onmousemove = (e) => {
			this.drawAreas.forEach(x => x.mousemove(e));
		};
	}

	/**
	 * Clear mouse move event on mouse up
	 * @param {MouseEvent} e
	 */
	private mouseUp(e: MouseEvent): void{
		this.drawInterval = null;
		this.canvas.onmousemove = null;
		this.drawAreas.forEach(x => x.mouseup(e));
	}

	/**
	 * Detect double click events
	 * @param {MouseEvent} e
	 */
	private click(e: MouseEvent): void{
		const clickTime: number = Date.now();
		if(clickTime <= this.lastClickTime + 200){
			this.lastClickTime = 0;
			this.drawAreas.forEach(drawArea => drawArea.doubleClick(e));
		} else {
			this.lastClickTime = clickTime;
		}
	}

	/**
	 * Adjust the context width and height upon a resize
	 */
	private resize(): void{
		this.ctx.canvas.width  = window.innerWidth - 20;
		this.ctx.canvas.height = window.innerHeight - 20;
		this.width = this.ctx.canvas.width;
		this.height = this.ctx.canvas.height;
		this.drawAreas.forEach(drawArea => drawArea.resize());
		this.draw();
	}

	/**
	 * Perform a single draw
	 */
	private draw(): void{
		this.clear();
		this.drawBackground();
		this.drawAreas.forEach(drawArea => drawArea.draw());
	}

	/**
	 * Clear the whole canvas area
	 */
	private clear(): void{
		this.ctx.clearRect(0, 0, this.width, this.height);
	}

	/**
	 * Draw the background of the canvas
	 */
	private drawBackground(): void{
		this.ctx.fillStyle = "#FAF7F8";
		this.ctx.beginPath();
		this.ctx.rect(0,0,this.width,this.height);
		this.ctx.closePath();
		this.ctx.fill();
	}
}

export default Canvas;

/**
 * @file canvas.ts
 * @description Main class responsible for management of overall context.
 * @author Stanley Clark <me@stanrogo.com>
 * @version 0.0.1
 */

import EventNotifier from "./utilities/eventNotifier";
import CanvasSection from "../interfaces/CanvasSection";
import DrawArea from "./drawArea";

class Canvas {
    public ctx: CanvasRenderingContext2D;

	private canvas: HTMLCanvasElement;
	private lastClickTime: number;
	private drawInterval: number;

	private mouseDownNotifier: EventNotifier;
	private mouseUpNotifier: EventNotifier;
    private mouseMoveNotifier: EventNotifier;
	private doubleClickNotifier: EventNotifier;
	private resizeNotifier: EventNotifier;
	private drawNotifier: EventNotifier;

	constructor(){
		this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.lastClickTime = 0;
		this.drawInterval = null;
		this.canvas.onmousemove = null;
		this.canvas.onmousedown = this.mouseDown.bind(this);
		this.canvas.onmouseup = this.mouseUp.bind(this);
		this.canvas.onclick = this.click.bind(this);
		window.onresize = this.resize.bind(this);

		this.mouseDownNotifier = new EventNotifier();
		this.mouseUpNotifier = new EventNotifier();
		this.mouseMoveNotifier = new EventNotifier();
		this.doubleClickNotifier = new EventNotifier();
		this.resizeNotifier = new EventNotifier();
		this.drawNotifier = new EventNotifier();

		this.setCanvasSize();
	}

	public subscribeItem(item: CanvasSection) {
		this.mouseDownNotifier.subscribe(item.mouseDown.bind(item));
		this.mouseMoveNotifier.subscribe(item.mouseMove.bind(item));
		this.drawNotifier.subscribe(item.draw.bind(item));
		this.doubleClickNotifier.subscribe(item.doubleClick.bind(item));
        this.resizeNotifier.subscribe(item.resize.bind(item));
	}

    public subscribeDrawArea(drawArea: DrawArea) {
        this.drawNotifier.subscribe(drawArea.draw.bind(drawArea));
        this.resizeNotifier.subscribe(drawArea.resize.bind(drawArea));
    }

    /**
     * Notify that subscribed objects should initiate a new draw
     */
    public draw(): void {
        this.drawNotifier.notify();
    }

    private setCanvasSize() {
        this.ctx.canvas.width  = window.innerWidth - 20;
        this.ctx.canvas.height = window.innerHeight - 20;
	}

	/**
	 * Draw at regular intervals on mouse down
	 * @param {MouseEvent} me
	 */
	private mouseDown(me: MouseEvent): void {
		this.drawInterval = window.setInterval(this.draw.bind(this), 1);
		this.canvas.onmousemove = (e) => this.mouseMoveNotifier.notify(e);
        this.mouseDownNotifier.notify(me);
	}

	/**
	 * Clear mouse move event on mouse up and notify
	 * @param {MouseEvent} e
	 */
	private mouseUp(e: MouseEvent): void {
		window.clearInterval(this.drawInterval);
		this.canvas.onmousemove = null;
        this.mouseUpNotifier.notify(e);
	}

	/**
	 * Detect double click events
	 * @param {MouseEvent} e
	 */
	private click(e: MouseEvent): void {
		const clickTime: number = Date.now();
		if (clickTime <= this.lastClickTime + 200) {
			this.lastClickTime = 0;
            this.doubleClickNotifier.notify(e);
		} else {
			this.lastClickTime = clickTime;
		}
	}

	/**
	 * Notify that a resize event has taken place and resize the main canvas
	 */
	private resize(): void {
        this.setCanvasSize();
        this.resizeNotifier.notify();
	}
}

export default Canvas;

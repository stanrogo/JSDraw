import ClassShape from './shapes/classShape';
import Shape from './shapes/shape';

class Canvas {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	width = 400;
	height = 300;
	shapes : Shape[];

	constructor(){
		this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");

		this.shapes = [];
		this.shapes.push(new ClassShape(this.ctx));
		this.shapes.push(new ClassShape(this.ctx));

		setInterval(this.draw.bind(this), 10);

		this.canvas.onmousedown = this.mouseDown.bind(this);
		this.canvas.onmouseup = this.mouseUp.bind(this);
	}

	mouseDown(e){
		this.shapes.some((shape) => {
			const event = shape.mouseDown(e);
			if(event !== null){
				this.canvas.onmousemove = event;
				return true;
			}
		})
	}

	mouseUp(){
		this.canvas.onmousemove = null;
	}

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}

	drawBackground() {
		this.ctx.fillStyle = "#FAF7F8";
		this.ctx.beginPath();
		this.ctx.rect(0,0,this.width,this.height);
		this.ctx.closePath();
		this.ctx.fill();
	}

	resize(){
		this.ctx.canvas.width  = window.innerWidth - 100;
		this.ctx.canvas.height = window.innerHeight - 100;
		this.width = this.ctx.canvas.width;
		this.height = this.ctx.canvas.height;
	}

	draw() {
		this.resize();
		this.clear();
		this.drawBackground();
		this.shapes.forEach(shape => shape.draw());
	}
}

export default Canvas;

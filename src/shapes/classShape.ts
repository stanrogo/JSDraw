import Shape from './shape';

class ClassShape extends Shape {

	constructor(ctx: CanvasRenderingContext2D){
		super(ctx);
	}

	draw(){
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
	}
}

export default ClassShape;

import Shape from './shape';

class ClassShape extends Shape {

	className: string;
	classNameInput: HTMLInputElement;

	constructor(ctx: CanvasRenderingContext2D){
		super(ctx);
		this.className = '';
		this.classNameInput = null;
	}

	mouseDown(e): (this: HTMLElement, ev: MouseEvent) => any {
		if(this.classNameInput) this.removeInput();
		return super.mouseDown(e);
	}

	doubleClick(e): void {

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
			}
		});
		document.body.appendChild(input);
		this.classNameInput = input;
	}

	removeInput(){
		this.className = this.classNameInput.value;
		this.classNameInput.parentNode.removeChild(this.classNameInput);
		this.classNameInput = null;
	}

	draw(): void{
		this.ctx.fillStyle = "#FFFFFF";
		this.ctx.beginPath();
		this.ctx.rect(this.x, this.y, 100, 120);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.fillStyle = "#000000";
		this.ctx.stroke();

		this.drawClassName();

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

	drawClassName(): void{
		if(!this.className) return;

		this.ctx.fillStyle = "blue";
		this.ctx.font = "bold 16px Arial";
		this.ctx.fillText(this.className, this.x + 10, this.y + 16 + 8);
	}
}

export default ClassShape;

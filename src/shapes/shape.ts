
abstract class Shape {

	protected ctx: CanvasRenderingContext2D;
	protected x: number = 75; // Left coordinate of shape
	protected y: number = 50; // Top coordinate of shape

	private clickX: number;
	private clickY: number;

	protected constructor(ctx: CanvasRenderingContext2D){
		this.ctx = ctx;
	}

	abstract draw(): void;

	private onMove(e): void{
		this.x = e.pageX - this.clickX;
		this.y = e.pageY - this.clickY;
	}

	public mouseDown(e): (this: HTMLElement, ev: MouseEvent) => any{
		if (!this.mouseInShape(e)) return null;
		this.setClickDifference(e);
		return this.onMove.bind(this);
	}

	private mouseInShape(e): boolean{
		return e.pageX < this.x + 100 && e.pageX > this.x - 100 && e.pageY < this.y + 120 && e.pageY > this.y -120;
	}

	private setClickDifference(e): void{
		this.clickX = e.pageX - this.x;
		this.clickY = e.pageY - this.y;
	}
}

export default Shape;

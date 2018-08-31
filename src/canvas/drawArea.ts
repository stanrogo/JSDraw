class DrawArea{
    private readonly ctx: CanvasRenderingContext2D;
    private width: number;
    private height: number;

    constructor(ctx: CanvasRenderingContext2D){
        this.ctx = ctx;
        this.width = null;
        this.height = null;
        this.resize();
    }

    /**
     * Adjust the context width and height upon a resize
     */
    public resize(): void{
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
        this.draw();
    }

    /**
     * Perform a single draw
     */
    public draw(): void{
        this.clear();
        this.drawBackground();
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

export default DrawArea;
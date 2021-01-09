class Painter {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private paintedFractal: ImageData | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') ?? new CanvasRenderingContext2D();
  }

  clear() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
  }

  drawFragment(imgData: ImageData, origin: number) {
    this.ctx.putImageData(imgData, 0, origin);
  }

  saveInCache() {
    const { width, height } = this.canvas;
    this.paintedFractal = this.ctx.getImageData(0, 0, width, height);
    this.firm();
  }

  drawAxis(posX: number, posY: number, Dx: number, Dy: number) {
    const { width, height } = this.canvas;
    if (!this.paintedFractal) {
      this.paintedFractal = this.ctx.getImageData(0, 0, width, height);
    }

    this.clear();
    this.ctx.putImageData(this.paintedFractal, 0, 0);

    // Calculate coords
    const posAxis: coord = {
      x: (posX * width) / Dx,
      y: height - (posY * height) / Dy,
    };

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(posAxis.x, 0, 1, height);
    this.ctx.fillRect(0, posAxis.y, width, 1);

    this.firm();
  }

  firm() {
    const firmText = 'https://fractalsv2.vercel.app/';
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '20px sans-serif';
    this.ctx.fillText(firmText, 10, 20);
  }
}

export default Painter;

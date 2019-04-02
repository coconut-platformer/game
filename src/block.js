import Box from './box';

export default class Block extends Box {
  constructor(x, y, width, height) {
    super(x, y, width, height);

    this.backgroundColor = "#3C9";
  }

  draw(context) {
    context.fillStyle = this.backgroundColor;
    const {
      x,
      y
    } = this.position();
    context.fillRect(x, y, this.width, this.height);
  }

  addDecoration(decoration) {
    this.decoration = decoration;
  }

  removeDecoration() {
    this.addDecoration(null);
  }

  drawDecoration(context) {
    if (!this.decoration) return;
    this.decoration.draw(context, this.x, this.y);
  }
}

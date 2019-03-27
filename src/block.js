export default class Block {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.backgroundColor = "#3C9";
  }

  draw(context, xOffset) {
    context.fillStyle = this.backgroundColor;
    context.fillRect(xOffset + this.x, this.y, this.width, this.height);
  }
}

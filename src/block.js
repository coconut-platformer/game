export default class Block {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.backgroundColor = "#3C9";
    this.right = this.x + this.width;
  }

  draw(context, xOffset) {
    context.fillStyle = this.backgroundColor;
    context.fillRect(xOffset + this.x, this.y, this.width, this.height);
  }

  points() {
    return {
      topLeft: { x: this.x, y: this.y },
      topRight: { x: this.x + this.width, y: this.y },
      bottomRight: { x: this.x + this.width, y: this.y + this.height },
      bottomLeft: { x: this.x, y: this.y + this.height }
    };
  }

  overlaps(other) {
    const { topLeft, bottomRight } = this.points();
    return Object.values(other.points()).some(point => {
      return (
        point.x >= topLeft.x &&
        point.x <= bottomRight.x &&
        (point.y >= topLeft.y && point.y <= bottomRight.y)
      );
    });
  }
}

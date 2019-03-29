const makePoints = (x, y, width, height) => ({
  topLeft: {
    x,
    y
  },
  topRight: {
    x: x + width,
    y
  },
  bottomRight: {
    x: x + width,
    y: y + height
  },
  bottomLeft: {
    x,
    y: y + height
  }
});

export default class Block {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.backgroundColor = "#3C9";

    this._points = makePoints(x, y, width, height);
  }

  position() {
    return this._points.topLeft;
  }

  move(x, y) {
    this._points = makePoints(x, y, this.width, this.height);
  }

  draw(context) {
    context.fillStyle = this.backgroundColor;
    const {
      x,
      y
    } = this.position();
    context.fillRect(x, y, this.width, this.height);
  }

  points() {
    return this._points;
  }

  overlaps(other) {
    const {
      topLeft,
      bottomRight
    } = this.points();
    return Object.values(other.points()).some(point => {
      return (
        point.x >= topLeft.x &&
        point.x <= bottomRight.x &&
        (point.y >= topLeft.y && point.y <= bottomRight.y)
      );
    });
  }
}

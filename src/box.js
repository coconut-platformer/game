const makePoints = (x, y, width, height) => ({
  topLeft: {
    x,
    y,
  },
  topRight: {
    x: x + width,
    y,
  },
  bottomRight: {
    x: x + width,
    y: y + height,
  },
  bottomLeft: {
    x,
    y: y + height,
  },
});

export default class Box {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;

    this._points = makePoints(x, y, width, height);
  }

  get x() {
    return this._points.topLeft.x;
  }
  get y() {
    return this._points.topLeft.y;
  }

  right() {
    return this.x + this.width;
  }

  bottom() {
    return this.y + this.height;
  }

  position() {
    return this._points.topLeft;
  }

  center() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
  }

  move(x, y) {
    this._points = makePoints(x, y, this.width, this.height);
  }

  points() {
    return this._points;
  }

  overlaps(other) {
    const { topLeft, bottomRight } = this.points();
    return Object.values(other.points()).some(point => {
      return (
        point.x > topLeft.x &&
        point.x < bottomRight.x &&
        (point.y > topLeft.y && point.y < bottomRight.y)
      );
    });
  }
}

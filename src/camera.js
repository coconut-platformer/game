import Box from './box';

export default class Camera extends Box {
  constructor(width, height) {
    super(0, 0, width, height);
    this.listener = null;
  }

  listen(fn) {
    this.listener = fn;
    return () => {
      if (this.listener === fn) {
        this.listener = null;
      }
    };
  }

  move(x, y) {
    super.move(x, y);
    if (this.listener) {
      this.listener(this);
    }
  }

  centerOn(block) {
    this.move(block.x - (this.width / 2), block.y - (this.height / 2));
  }

  stepTowards(block) {
    const center = this.center();
    const yDiff = block.y - center.y;

    this.centerOn({
      x: block.x,
      y: center.y + (yDiff / 10),
    });
  }
}

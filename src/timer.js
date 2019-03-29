export default class Timer {
  constructor() {
    this.lastFrame = null;
    this.accumulator = 0;
    this.delta = 0;
  }

  addTime(timestamp) {
    if (this.lastFrame) {
      this.delta = timestamp - this.lastFrame;
    }
    this.accumulator += this.delta;
    this.lastFrame = timestamp;
  }

  getDelta() {
    return this.delta;
  }

  drainAccumulator(amount, callback) {
    while (this.accumulator > amount) {
      callback();
      this.accumulator -= amount;
    }
  }
}

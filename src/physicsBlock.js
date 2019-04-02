import Block from "./block";

export default class PhysicsBlock extends Block {
  constructor(x, y, width, height, mass = 1.0, friction = 0.1) {
    super(x, y, width, height);

    this.previous = this.position();
    this.acceleration = {
      x: 0,
      y: 0
    };
    this._mass = mass;
    this.friction = friction;
  }

  get mass() {
    return this._mass;
  }
  set mass(val) {
    this._mass = val;
  }

  move(x, y) {
    this.previous = this.position();
    super.move(x, y);
  }

  hasMass() {
    return this.mass > 0;
  }

  removeVelocity() {
    this.previous = this.position();
  }

  getVelocity(scale = 1.0) {
    return {
      x: (this.x - this.previous.x) * scale,
      y: (this.y - this.previous.y) * scale
    };
  }

  setAcceleration(x, y) {
    this.acceleration = {
      x,
      y
    };
  }

  addAcceleration(x, y) {
    this.acceleration = {
      x: this.acceleration.x + x,
      y: this.acceleration.y + y
    };
  }

  onTouch(block, contactY) {}

  onNotTouch() {}
}

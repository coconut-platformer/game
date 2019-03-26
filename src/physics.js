export default class Physics {
  constructor(gravity, friction) {
    this.gravity = gravity;
    this.friction = friction;
  }

  apply(coconut) {
    coconut.position.x += coconut.velocity.x;
    coconut.velocity.y /= this.friction;
    coconut.position.y = Math.max(coconut.position.y + coconut.velocity.y - this.gravity, 0);
  }
}
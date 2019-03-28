export default class Physics {
  constructor(gravity, friction, world) {
    this.gravity = gravity;
    this.friction = friction;
    this.world = world;
  }

  integrate(coconut) {
    coconut.velocity.y /= this.friction;
    coconut.y = Math.max(coconut.y - coconut.velocity.y + this.gravity, 0);

    let collisions = this.world.collision(coconut);

    if (collisions.length > 0) {
      coconut.y = this.findHighestCollision(collisions).y - coconut.height;
    }
  }

  findHighestCollision(collisions) {
    return collisions.reduce((highestCollision, collision) => {
      if (!highestCollision) return collision;
      return collision.y < highestCollision.y ? collision : highestCollision;
    }, null);
  }
}
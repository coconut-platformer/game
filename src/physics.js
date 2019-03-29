export default class Physics {
  constructor(gravity, friction, world) {
    this.gravity = gravity;
    this.friction = friction;
    this.world = world;
  }

  integrate(physicsBlock, timeStep) {
    if (!physicsBlock.hasMass()) {
      physicsBlock.acceleration = {
        x: 0,
        y: 0
      };
      return;
    }

    physicsBlock.setAcceleration(
      (physicsBlock.acceleration.x + this.gravity.x) * physicsBlock.mass,
      (physicsBlock.acceleration.y + this.gravity.y) * physicsBlock.mass,
    );

    const velocity = physicsBlock.getVelocity(this.friction);
    const timeScale = timeStep * timeStep / 1000;
    const acceleration = {
      x: physicsBlock.acceleration.x * timeScale,
      y: physicsBlock.acceleration.y * timeScale,
    };
    const x = physicsBlock.position().x + velocity.x + acceleration.x;
    const y = physicsBlock.position().y + velocity.y + acceleration.y;
    physicsBlock.move(x, y);
    physicsBlock.setAcceleration(0, 0);

    const collisions = this.world.collision(physicsBlock);
    const highest = collisions.reduce((highest, collision) => {
      const worldBlock = collision.block;
      if (!highest) return worldBlock;
      return highest.position().y < worldBlock.position().y ?
        highest :
        worldBlock;
    }, null);

    if (highest) {
      const highestY = highest.position().y - physicsBlock.height;
      if (physicsBlock.position().y > highestY) {
        physicsBlock.move(physicsBlock.position().x, highestY);
        physicsBlock.removeVelocity();
        physicsBlock.setInteractions(true);
      }
    } else {
      physicsBlock.setInteractions(false);
    }
  }
}

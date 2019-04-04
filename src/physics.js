export default class Physics {
  constructor(gravity, friction, world) {
    this.gravity = gravity;
    this.friction = friction;
    this.world = world;
  }

  integrate(dynamicBlocks, timeStep) {
    dynamicBlocks.forEach(physBlock =>
      this.integrateBlock(physBlock, timeStep),
    );
  }

  integrateBlock(physicsBlock, timeStep) {
    if (!physicsBlock.hasMass()) {
      physicsBlock.acceleration = {
        x: 0,
        y: 0,
      };
      return;
    }

    physicsBlock.setAcceleration(
      (physicsBlock.acceleration.x + this.gravity.x) * physicsBlock.mass,
      (physicsBlock.acceleration.y + this.gravity.y) * physicsBlock.mass,
    );

    const velocity = physicsBlock.getVelocity(this.friction);
    const timeScale = (timeStep * timeStep) / 1000;
    const acceleration = {
      x: physicsBlock.acceleration.x * timeScale,
      y: physicsBlock.acceleration.y * timeScale,
    };
    const x = physicsBlock.x + velocity.x + acceleration.x;
    const y = physicsBlock.y + velocity.y + acceleration.y;
    physicsBlock.move(x, y);
    physicsBlock.setAcceleration(0, 0);

    this.collideBlock(physicsBlock);
  }

  collideBlock(physicsBlock) {
    const collisions = this.world.collision(physicsBlock);
    physicsBlock.onCollisions(collisions);
    // for(const collision of collisions) {
    //   physicsBlock.onTouch(collision);
    // }
    // if (collisions.length === 0) {
    //   physicsBlock.onNotTouch();
    // }
  }
}

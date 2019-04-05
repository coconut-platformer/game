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

    // physicsBlock.onCollisions(this.world.collision(physicsBlock));

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

    physicsBlock.onCollisions(this.world.collision(physicsBlock));
  }
}

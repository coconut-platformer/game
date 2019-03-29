import PhysicsBlock from "./physicsBlock";

const COCONUT_SIZE = 50;

export default class Coconut extends PhysicsBlock {
  constructor(image) {
    super(2 * COCONUT_SIZE, COCONUT_SIZE, COCONUT_SIZE, COCONUT_SIZE, 10, 0.1);
    this.coconut = image;
    this.velocity = {
      y: 10
    };
  }

  draw(context) {
    context.drawImage(this.coconut, this.x, this.y + 2, this.width, this.height);
  }

  bounce() {
    if (!this.canInteract()) return;

    this.addAcceleration(0, -2);
  }

  jump() {
    if (!this.canInteract()) return;

    this.addAcceleration(0, -5);
  }
}

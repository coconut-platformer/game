import PhysicsBlock from "./physicsBlock";
import Umbrella from "./decorations/umbrella";

const COCONUT_SIZE = 50;

export default class Coconut extends PhysicsBlock {
  constructor(image) {
    super(512, COCONUT_SIZE, COCONUT_SIZE, COCONUT_SIZE, 10, 0.1);
    this.coconut = image;
    this.velocity = {
      y: 10
    };

    this.canJump = false;
    this.canUmbrella = false;
    this.massScale = 1;
  }

  get mass() {
    return this._mass * this.massScale;
  }

  advance(amount) {
    const {
      y
    } = this.previous;
    this.move(this.x + amount, this.y);
    this.previous.y = y;
  }

  draw(context) {
    this.drawDecoration(context);
    context.drawImage(
      this.coconut,
      this.x,
      this.y + 2,
      this.width,
      this.height
    );
  }

  bounce() {
    if (!this.canInteract()) return;

    this.addAcceleration(0, -2);
  }

  interact(assetManager) {
    this.umbrella(assetManager);
    this.jump(assetManager);
  }

  cancel() {
    this.massScale = 1;
    this.canUmbrella = !this.canJump;
    this.removeDecoration();
  }

  umbrella(assetManager) {
    if (!this.canUmbrella) return;
    if (this.getVelocity().y < 0) return;
    console.log("umbrella");

    this.addDecoration(new Umbrella(assetManager));

    this.massScale = 0.05;
    this.canUmbrella = false;
  }

  jump(assetManager) {
    if (!this.canJump) return;
    console.log("jump");

    this.addAcceleration(0, -5);
    this.canUmbrella = true;
  }

  onTouch(block, contactY) {
    this.move(this.x, contactY);
    this.removeVelocity();
    this.canJump = true;
    this.canUmbrella = false;
    this.massScale = 1;
    this.removeDecoration();
  }

  onNotTouch() {
    this.canJump = false;
  }
}

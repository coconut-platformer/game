import PhysicsBlock from './physicsBlock';
import Umbrella from './terrain/decorations/umbrella';

const COCONUT_SIZE = 50;

export default class Coconut extends PhysicsBlock {
  constructor(image) {
    super(512, COCONUT_SIZE, COCONUT_SIZE, COCONUT_SIZE, 10, 0.1);
    this.coconut = image;
    this.velocity = {
      y: 10,
    };

    this.speedScale = 1;
    this.massScale = 1;
    this.canMoveForward = true;
    this.collisions = [];
    this.usingUmbrella = false;
  }

  get mass() {
    return this._mass * this.massScale;
  }

  advance(amount) {
    if (!this.canMoveForward) return;

    const { y } = this.previous;
    this.move(this.x + (amount * this.speedScale), this.y);
    this.previous.y = y;
  }

  draw(context) {
    this.drawDecoration(context);
    context.drawImage(
      this.coconut,
      this.x,
      this.y + 2,
      this.width,
      this.height,
    );
  }

  interact(assetManager) {
    this.umbrella(assetManager);
    this.jump(assetManager);
  }

  cancel() {
    this.massScale = 1;
    this.usingUmbrella = false;
    this.canMoveForward = true;
    this.removeDecoration();
  }

  umbrella(assetManager) {
    if (!this.canUmbrella()) return;
    this.removeVelocity();

    this.addDecoration(new Umbrella(assetManager));

    this.massScale = 0.1;
    this.usingUmbrella = true;
  }

  canJump() {
    return this.collisions.length > 0;
  }

  canUmbrella() {
    return !this.canJump() && this.getVelocity().y >= 0 && !this.usingUmbrella;
  }

  jump() {
    if (!this.canJump()) return;

    this.addAcceleration(0, -5 * this.speedScale);
  }

  onCollisions(collisions) {
    this.collisions = collisions;
    const [under, right] = collisions;

    const noCollisions = collisions.length === 0;
    const oneCollision = collisions.length === 1;
    const twoCollisionsSameHeight = collisions.length === 2 && under.block.y === right.block.y

    this.canMoveForward = (noCollisions || oneCollision || twoCollisionsSameHeight);
    this.speedScale = collisions.some(c => c.block.isDangerous()) ? 0.3 : 1;

    if (oneCollision || twoCollisionsSameHeight) {
      const contactY = under.block.y - this.height;
      this.move(this.x, contactY);
      this.removeVelocity();

      // We're on top of the block
    } else if (collisions.length === 2) {
      const contactX = right.block.x - this.width;
      const contactY = under.block.y - this.height;
      this.move(contactX, contactY);
      this.removeVelocity();
    }
    if (!this.canMoveForward) {
      this.removeVelocity();
    }
    if (collisions.length > 0) {
      this.cancel();
    }
  }
}

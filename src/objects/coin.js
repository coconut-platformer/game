import Box from '../box.js';

export default class Coin extends Box {
  constructor(x, y, assetManager) {
    super(x, y, 32, 32);
    this.assetManager = assetManager;
  }

  isDangerous() {
    return false;
  }

  draw(context) {
    context.drawImage(
      this.assetManager.getImage('coin'),
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}

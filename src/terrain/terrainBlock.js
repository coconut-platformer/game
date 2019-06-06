import PhysicsBlock from '../physicsBlock.js';

export default class TerrainBlock extends PhysicsBlock {
  constructor(image, x, y, width, height, dangerous = false) {
    super(x, y, width, height, 0, 0.1);
    this.image = image;
    this.dangerous = dangerous;
  }

  isDangerous() {
    return this.dangerous;
  }

  draw(context) {
    const overlap = 5;
    const width = this.width + overlap * 2;
    const ratio = this.image.height / this.image.width;
    const height = this.height * ratio;
    this.drawDecoration(context);
    context.drawImage(this.image, this.x - overlap, this.y, width, height);
  }

  addRandomDecoration(probability = 0.5) {
    if (!this.decorations) {
      return;
    }

    if (Math.random() < probability) {
      this.addDecoration(
        this.decorations[Math.floor(Math.random() * this.decorations.length)],
      );
    }
  }
}

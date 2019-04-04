import Block from '../block.js';

export default class TerrainBlock extends Block {
  constructor(image, x, y, width, height) {
    super(x, y, width, height);
    this.image = image;
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

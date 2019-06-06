import TerrainBlock from './terrainBlock.js';

export default class Water extends TerrainBlock {
  constructor(assetManager, x, y, width, height) {
    super(assetManager.getImage('water'), x, y, width, height, true);

    this.frameWidth = 211;

    this.frames = Math.floor(this.image.width / this.frameWidth);
    this.frame = Math.round(Math.random() * this.frames);

    // this.addRandomDecoration(0.1);
  }

  animateWater(value) {
    const v = Math.round(value);
    this.imageX = v * this.width;
  }

  draw(context) {
    this.frame = (this.frame + .1) % this.frames;
    const imageX = Math.floor(this.frame) * this.frameWidth;
    const overlap = 5;
    const width = this.width + overlap * 2;
    const ratio = this.image.height / this.frameWidth;
    const height = this.height * ratio;
    this.drawDecoration(context);
    context.drawImage(this.image, imageX, 0, this.frameWidth, this.image.height, this.x, this.y, width, height);
  }
}

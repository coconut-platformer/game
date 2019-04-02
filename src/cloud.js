import Block from './block';
export default class Cloud extends Block {
  constructor(image, x, y, distance) {
    super(x, y, image.width / distance, image.height / distance);
    this.image = image;
    this.distance = distance;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  updatePosition(baseSpeed = -1) {
    this.x += baseSpeed / this.distance;
  }
}

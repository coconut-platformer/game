export default class Cloud {
  constructor(image, x, y, distance) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.distance = distance;
    this.width = this.image.width / this.distance;
    this.height = this.image.height / this.distance;
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

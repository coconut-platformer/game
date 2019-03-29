export default class Cloud {
  constructor(image, x, y, distance) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.distance = distance;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.x,
      this.y,
      this.image.width / this.distance,
      this.image.height / this.distance
    );
  }

  updatePosition(baseSpeed = -1) {
    this.x += baseSpeed / this.distance;
  }
}

import Block from "./block";

const COCONUT_SIZE = 50;

export default class Coconut extends Block {
  constructor(image) {
    super(2 * COCONUT_SIZE, COCONUT_SIZE, COCONUT_SIZE, COCONUT_SIZE);
    this.coconut = image;
    this.velocity = { y: 10 };
  }

  draw(context) {
    context.drawImage(this.coconut, this.x, this.y, this.width, this.height);
  }

  jump() {
    this.y -= 100;
    this.velocity.y = 10;
  }
}
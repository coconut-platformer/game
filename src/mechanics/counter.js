import Box from '../box';

export default class Counter {
  constructor(image) {
    this.image = image;
    this.amount = 0;
  }

  collect(value = 1) {
    this.amount += value;
  }

  render(context) {
    context.atDepth('hud', () => {
      context.drawImage(
        this.image,
        1024 - 140,
        25,
        this.image.width * 0.8,
        this.image.height * 0.8,
      );
      context.fillStyle = '#000';
      context.strokeStyle = '#000';
      context.drawText(
        `x ${Math.ceil(this.amount)}`,
        1024 - 140 + this.image.width,
        50,
      );
    });
  }
}

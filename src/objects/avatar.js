import Box from '../box.js';

export default class Avatar extends Box {
  constructor(image, x, y) {
    super(x, y, image.width, image.height);
    this.image = image;
  }

  render(context) {
    context.atDepth('fg', () => {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
    });
  }
}

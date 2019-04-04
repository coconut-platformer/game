export default class BlockDecoration {
  constructor(image, xOffset, yOffset, scalingFactor) {
    this.image = image;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.scalingFactor = scalingFactor;
  }

  draw(context, relativeX, relativeY) {
    context.drawImage(
      this.image,
      relativeX + this.xOffset,
      relativeY - this.image.height * this.scalingFactor + this.yOffset,
      this.image.width * this.scalingFactor,
      this.image.height * this.scalingFactor
    );
  }
}

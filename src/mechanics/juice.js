import Box from '../box';

export default class Juice {
  constructor(max) {
    this.value = max;
    this.max = max;
  }

  adjust(amount) {
    this.value = Math.max(Math.min(this.max, this.value + amount), 0);
  }

  render(context) {
    const spacing = 150;
    const container = new Box(spacing, 20, 1024 - spacing * 2, 50);
    const inner = container.resizeBy(5);
    const width = (this.value / this.max) * inner.width;
    inner.width = width;

    context.atDepth('hud', () => {
      context.fillStyle = 'rgba(0, 0, 0, 0.6';
      context.fillRect(
        container.x,
        container.y,
        container.width,
        container.height,
      );
      context.fillStyle = 'rgba(51, 153, 204, 0.8)';
      context.fillRect(inner.x, inner.y, inner.width, inner.height);
    });
  }
}

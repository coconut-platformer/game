export default class RenderContext {
  constructor(canvas) {
    this.context = canvas.getContext('2d');

    this.depths = [];
    this.depth = 0;
    this.alpha = 1.0;
    this.fill = this.context.fillStyle;
    this.stroke = this.context.strokeStyle;

    this.resetOperations();
  }

  addDepth(name, z) {
    this.depths = this.depths.filter(d => d.name !== name).concat({
      name,
      z
    });
    return this;
  }

  atDepth(name, fn) {
    const initialDepth = this.depth;
    const depth = this.depths.find(d => d.name === name);
    const baseZ = depth ? depth.z : 0;
    this.depth = baseZ;

    const tweakDepth = (value) => {
      this.depth = baseZ + value;
    }

    fn(tweakDepth);

    this.depth = initialDepth;
    return this;
  }

  withTransparency(alpha, fn) {
    const initialAlpha = this.context.globalAlpha;
    this.alpha = alpha;

    fn();

    this.alpha = 1.0;
    return this;
  }

  resetOperations() {
    this.operations = [];
    return this;
  }

  addOperation(type, ...args) {
    this.operations.push([{
        type,
        z: this.depth,
        alpha: this.alpha,
        fillStyle: this.fill,
        strokeStyle: this.stroke,
      },
      ...args,
    ]);
    return this;
  }

  set fillStyle(value) {
    this.fill = value;
  }

  set strokeStyle(value) {
    this.stroke = value;
  }

  drawImage(image, x, y, width, height) {
    return this.addOperation('drawImage', image, x, y, width, height);
  }

  fillRect(x, y, width, height) {
    return this.addOperation('fillRect', x, y, width, height);
  }

  commit() {
    const operations = this.operations.sort((a, b) => b[0].z - a[0].z);
    operations.forEach(([op, ...args]) => {
      this.context.globalAlpha = op.alpha;
      this.fillStyle = op.fillStyle;
      this.strokeStyle = op.strokeStyle;
      switch (op.type) {
        case 'fillStyle':
          this.context.fillStyle = args[0];
          break;
        case 'strokeStyle':
          this.context.strokeStyle = args[0];
          break;
        case 'drawImage':
          this.context.drawImage(...args);
          break;
        case 'fillRect':
          this.context.fillRect(...args);
          break;
      }
    });

    return this.resetOperations();
  }
}

export default class RenderContext {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.context.globalAlpha = 1.0;

    this.depths = [];
    this.depth = 0;
    this.alpha = 1.0;
    this.fill = this.context.fillStyle;
    this.stroke = this.context.strokeStyle;
    this._font = '24px sans-serif';
    this.transform = { x: 0, y: 0 };

    this.resetOperations();
  }

  cloneWithCamera(camera) {
    return new RenderContext(this.canvas, camera);
  }

  addDepth(name, z) {
    this.depths = this.depths
      .filter(d => d.name !== name)
      .concat({
        name,
        z,
      });
    return this;
  }

  atDepth(name, fn) {
    const initialDepth = this.depth;
    const depth = this.depths.find(d => d.name === name);
    const baseZ = depth ? depth.z : 0;
    this.depth = baseZ;

    const tweakDepth = value => {
      this.depth = baseZ + value;
    };

    fn(tweakDepth);

    this.depth = initialDepth;
    return this;
  }

  withTransform({ x, y }, fn) {
    const initialTransform = this.transform;
    this.transform = { x, y };

    fn();

    this.transform = initialTransform;
    return this;
  }

  withTransparency(alpha, fn) {
    const initialAlpha = this.alpha;
    this.alpha = alpha;

    fn();

    this.alpha = initialAlpha;
    return this;
  }

  resetOperations() {
    this.operations = [];
    return this;
  }

  addOperation(type, ...args) {
    if (this.alpha === 0) return this;
    this.operations.push([
      {
        type,
        z: this.depth,
        alpha: this.alpha,
        fillStyle: this.fill,
        strokeStyle: this.stroke,
        transform: this.transform,
        font: this._font,
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

  set font(value) {
    this._font = value;
  }

  drawText(text, x, y) {
    return this.addOperation('drawText', text, x, y);
  }

  drawImage(image, x, y, width, height) {
    return this.addOperation('drawImage', image, x, y, width, height);
  }

  fillRect(x, y, width, height) {
    return this.addOperation('fillRect', x, y, width, height);
  }

  applyArgs(op, args) {
    switch (op.type) {
      case 'drawText': {
        const [text, x, y, ...rest] = args;
        return [text, x - op.transform.x, y - op.transform.y, ...rest];
      }

      case 'fillRect': {
        const [x, y, ...rest] = args;
        return [x - op.transform.x, y - op.transform.y, ...rest];
      }

      case 'drawImage': {
        if (args.length >= 6) {
          const [image, sx, sy, sw, sh, dx, dy, dw, dh] = args;
          return [
            image,
            sx,
            sy,
            sw,
            sh,
            dx - op.transform.x,
            dy - op.transform.y,
            dw,
            dh,
          ];
        } else {
          const [image, x, y, ...rest] = args;
          return [image, x - op.transform.x, y - op.transform.y, ...rest];
        }
      }

      default:
        return args;
    }
  }

  commit() {
    const operations = this.operations.sort((a, b) => b[0].z - a[0].z);
    operations.forEach(([op, ...args]) => {
      this.context.globalAlpha = op.alpha;
      this.context.fillStyle = op.fillStyle;
      this.context.strokeStyle = op.strokeStyle;
      switch (op.type) {
        case 'fillStyle':
          this.context.fillStyle = args[0];
          break;
        case 'strokeStyle':
          this.context.strokeStyle = args[0];
          break;
        case 'font':
          this.context.font = args[0];
          break;
        case 'drawText':
          this.context.font = op.font;
          this.context.strokeStyle = op.stroke;
          this.context.fillStyle = op.fill;
          this.context.fillText(...this.applyArgs(op, args));
          break;
        case 'drawImage': {
          this.context.drawImage(...this.applyArgs(op, args));
          break;
        }
        case 'fillRect': {
          this.context.fillStyle = op.fillStyle;
          this.context.fillRect(...this.applyArgs(op, args));
          break;
        }
      }
    });

    return this.resetOperations();
  }
}

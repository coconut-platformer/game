import Ai from './ai.js';
import AssetManager from './assetManager';
import RenderContext from './renderContext';
import Timer from './timer';
import TweenManager from './tweenManager';
import Camera from './camera';

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.camera = new Camera(this.canvas.width, this.canvas.height);
    this.context = new RenderContext(this.canvas, this.camera);
    this.assetManager = new AssetManager();
    this.tweenManager = new TweenManager();

    this.terrainBlockSize = 128;

    this._shared = {};

    this.middleware = [];

    window.addEventListener('blur', () => this.onBlur());
    window.addEventListener('focus', () => this.onFocus());
  }

  share(name, ref) {
    this._shared[name] = ref;
    return this;
  }

  unshare(name, ref) {
    if (this._shared[name] === ref) {
      delete this._shared[name];
    }
  }

  get(name, fallback) {
    return typeof this._shared[name] === 'undefined'
      ? fallback
      : this._shared[name];
  }

  with(middleware) {
    this.middleware.push(middleware);
    return this;
  }

  callMiddleware(methodName) {
    let i = null;
    for (i of this.middleware) {
      i[methodName](this);
    }
  }

  onBlur() {
    cancelAnimationFrame(this.handle);
  }

  onFocus() {
    this.timer = new Timer();
    this.tick();
  }

  start() {
    return this.assetManager
      .load()
      .then(() => this.create())
      .catch(console.error);
  }

  create() {
    this.timer = new Timer();
    this.callMiddleware('create');
    this.tick();
  }

  tick(timestamp) {
    this.timer.addTime(timestamp);

    this.onRender();
    this.context.commit();
    this.onTick();

    this.handle = requestAnimationFrame(ts => this.tick(ts));
  }

  onRender() {
    this.callMiddleware('render');
  }

  onTick() {
    this.callMiddleware('tick');
  }
}

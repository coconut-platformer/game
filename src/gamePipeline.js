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

    this.middleware = [];
    this.messages = [];

    this.messageQueue = this.messageQueue.bind(this);

    window.addEventListener('blur', () => this.onBlur());
    window.addEventListener('focus', () => this.onFocus());
  }

  messageQueue(message, source) {
    this.messages.push({ message, source });
  }

  with(middleware) {
    this.middleware.push(middleware);
    middleware.connect(this);
    return this;
  }

  callMiddleware(methodName, arg, source = null) {
    for (let i of this.middleware) {
      if (i === source) continue;
      i[methodName](this, arg);
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

    let message = this.messages.shift();
    while (message) {
      this.callMiddleware('onMessage', message.message, message.source);
      message = this.messages.shift();
    }

    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, 1024, 768);
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

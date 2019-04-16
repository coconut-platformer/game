import Middleware from './base';

export default class HumanMiddleware extends Middleware {
  constructor(id, key = ' ') {
    this.id = id;
    this.key = key;
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  create() {
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  destroy() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
  }

  onKeyDown(e) {
    if (e.repeat || e.key !== this.key) return;
    this.sendMessage({ type: 'startInteraction', id: this.id });
  }

  onKeyUp(e) {
    if (e.key !== this.key) return;
    this.sendMessage({ type: 'endInteraction', id: this.id });
  }
}

import Player from './player';

export default class Human extends Player {
  constructor(avatar, assetManager) {
    super(avatar);

    this.assetManager = assetManager;

    this.keyup = this.keyup.bind(this);
    this.keydown = this.keydown.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchEnd = this.touchEnd.bind(this);

    document.addEventListener('keyup', this.keyup);
    document.addEventListener('keydown', this.keydown);
    document.addEventListener('touchstart', this.touchStart);
    document.addEventListener('touchend', this.touchEnd);
  }

  keyup(e) {
    if (e.key === ' ') {
      this.touchEnd();
    }
  }

  keydown(e) {
    if (!e.repeat && e.key === ' ') {
      this.touchStart();
    }
  }

  touchStart() {
    this.avatar.interact(this.assetManager);
  }

  touchEnd() {
    this.avatar.cancel();
  }

  cleanup() {
    document.removeEventListener('keyup', this.keyup);
    document.removeEventListener('keydown', this.keydown);
  }
}

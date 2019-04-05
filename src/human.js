import Player from './player';

export default class Human extends Player {
  constructor(avatar, assetManager) {
    super(avatar);

    this.assetManager = assetManager;

    this.keyup = this.keyup.bind(this);
    this.keydown = this.keydown.bind(this);

    document.addEventListener('keyup', this.keyup);

    document.addEventListener('keydown', this.keydown);
  }

  keyup(e) {
    if (e.key === ' ') {
      this.avatar.cancel();
    }
  }

  keydown(e) {
    if (e.key === ' ') {
      this.avatar.interact(this.assetManager);
    }
  }

  cleanup() {
    document.removeEventListener('keyup', this.keyup);
    document.removeEventListener('keydown', this.keydown);
  }
}

import Player from './player';

export default class Human extends Player {
  constructor(avatar, assetManager) {
    super(avatar);

    this.assetManager = assetManager;
    this.interacting = false;

    this.keyup = this.keyup.bind(this);
    this.keydown = this.keydown.bind(this);

    document.addEventListener('keyup', this.keyup);

    document.addEventListener('keydown', this.keydown);
  }

  keyup(e) {
    if (e.key === ' ') {
      this.interacting = false;
      this.avatar.cancel();
    }
  }

  keydown(e) {
    if (e.key === ' ' && !this.interacting) {
      this.interacting = true;
      this.avatar.interact(this.assetManager);
    }
  }

  cleanup() {
    document.removeEventListener('keyup', this.keyup);
    document.removeEventListener('keydown', this.keydown);
  }
}

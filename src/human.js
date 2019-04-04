import Player from './player';

export default class Human extends Player {
  constructor(avatar, assetManager) {
    super(avatar);

    document.addEventListener('keyup', e => {
      if (e.key === ' ') {
        this.avatar.cancel();
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === ' ') {
        this.avatar.interact(assetManager);
      }
    });
  }
}

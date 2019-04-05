import Player from './player.js';

export default class Ai extends Player {
  constructor(avatar, assetManager) {
    super(avatar);
    this.assetManager = assetManager;
  }

  tick(terrainBlocks) {
    const { avatar } = this;
    const nextBlock = terrainBlocks.find(block => {
      return block.x > avatar.right();
    });
    const underBlock = terrainBlocks.find(block => {
      return block.x > avatar.x;
    });
    if (nextBlock && nextBlock.y < avatar.y) {
      return avatar.interact(this.assetManager);
    }
    if (nextBlock && nextBlock.isDangerous()) {
      return avatar.interact(this.assetManager);
    }
    if (underBlock && underBlock.isDangerous()) {
      return avatar.interact(this.assetManager);
    } else {
      return avatar.cancel();
    }
  }
}

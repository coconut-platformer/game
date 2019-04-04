import Player from "./player.js";
import Lava from "./terrain/lava.js";

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
    if (nextBlock instanceof Lava) {
      return avatar.interact(this.assetManager);
    }
    if (underBlock && underBlock instanceof Lava) {
      return avatar.interact(this.assetManager);
    } else {
      return avatar.cancel();
    }
  }
}

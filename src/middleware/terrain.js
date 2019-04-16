import Middleware from './base';
import TerrainGenerator from '../generators/terrain';

export default class TerrainGeneratorMiddleware extends Middleware {
  create(game) {
    this.generator = new TerrainGenerator(
      game.assetManager,
      'CURRENTLY UNUSED SEED',
      this.config.size,
    );

    this.activeBlockCount =
      Math.ceil(game.camera.width / this.config.size) + this.config.size * 5;

    this.terrain = [];
    this.updateBlocks(game.camera);
  }

  updateBlocks(camera) {
    let changed = false;

    let block = this.terrain[0];
    while (block && !camera.overlaps(block)) {
      this.terrain.shift();
      changed = true;
      block = this.terrain[0];
    }

    while (this.terrain.length < this.activeBlockCount) {
      this.terrain.push(this.generator.getNextBlock());
      changed = true;
    }

    if (changed) {
      this.sendMessage({ type: 'terrain', terrain: [...this.terrain] });
    }
  }

  tick(game) {
    this.updateBlocks(game.camera);
  }

  render(game) {
    game.context.withTransform(game.camera, () => {
      game.context.atDepth('fg', () => {
        this.terrain.forEach(b => b.draw(game.context));
      });
    });
  }
}

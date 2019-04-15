import GameMiddleware from './gameMiddleware';
import TerrainGenerator from './terrain/terrainGenerator';

export default class TerrainGeneratorMiddleware extends GameMiddleware {
  create(game) {
    this.generator = new TerrainGenerator(
      game.assetManager,
      'CURRENTLY UNUSED SEED',
      game.terrainBlockSize,
    );

    this.activeBlockCount = Math.ceil(game.camera.width / game.terrainBlockSize) + (game.terrainBlockSize * 5);

    this.terrain = [];
    game.share('terrain', this.terrain);
    this.updateBlocks(game.camera);
  }

  destroy(game) {
    game.unshare('terrain', this.blocks);
  }

  updateBlocks(camera) {
    let block = this.terrain[0];
    while (block && !camera.overlaps(block)) {
      this.terrain.shift();
      block = this.terrain[0];
    }

    while (this.terrain.length < this.activeBlockCount) {
      this.terrain.push(this.generator.getNextBlock());
    }
  }

  tick(game) {
    this.updateBlocks(game.camera);
  }

  render(game) {
    game.context
      .withTransform(game.camera, () => {
        game.context.atDepth('fg', () => {
          this.terrain.forEach(b => b.draw(game.context));
        });
      });
  }
}

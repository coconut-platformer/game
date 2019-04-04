import Sand from './sand';
import MathHelpers from '../mathHelpers';
import Stone from './stone';
import Lava from './lava';
import Water from './water';

const DOWN = 1;

export default class TerrainGenerator {
  constructor(assetManager, seed, terrainBlockSize) {
    this.assetManager = assetManager;
    this.seed = seed;
    this.terrainBlockSize = terrainBlockSize;
    this.previousBlock = null;
  }

  getNextBlock() {
    if (!this.previousBlock) {
      //start on sand
      this.previousBlock = new Sand(
        this.assetManager,
        -this.terrainBlockSize,
        this.terrainBlockSize * 3,
        this.terrainBlockSize,
        this.terrainBlockSize,
      );
    }
    const lastY = this.previousBlock.y;

    const x = this.previousBlock.x + this.terrainBlockSize;
    const direction = MathHelpers.randomIntegerBetween(-1, 1);
    const nextY = lastY + direction * (this.terrainBlockSize / 2);
    const nextBlock = this.getRandom(x, nextY, direction);
    this.previousBlock = nextBlock;
    return nextBlock;
  }

  getRandom(x, y, direction) {
    const safe = [
      () => {
        return new Sand(
          this.assetManager,
          x,
          y,
          this.terrainBlockSize,
          this.terrainBlockSize,
        );
      },
      () => {
        return new Stone(
          this.assetManager,
          x,
          y,
          this.terrainBlockSize,
          this.terrainBlockSize,
        );
      },
    ];

    const danger = [
      () => {
        return new Lava(
          this.assetManager,
          x,
          y,
          this.terrainBlockSize,
          this.terrainBlockSize,
        );
      },
      () => {
        return new Water(
          this.assetManager,
          x,
          y,
          this.terrainBlockSize,
          this.terrainBlockSize,
        );
      },
    ];

    const rnd = MathHelpers.randomIntegerBetween(0, 10);
    if (direction === DOWN && rnd < 8) {
      return danger[MathHelpers.randomIntegerBetween(0, danger.length - 1)]();
    }
    return safe[MathHelpers.randomIntegerBetween(0, safe.length - 1)]();
  }
}

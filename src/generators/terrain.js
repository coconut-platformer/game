import MathHelpers from '../mathHelpers';
import Sand from '../terrain/sand';
import Stone from '../terrain//stone';
import Lava from '../terrain//lava';
import Water from '../terrain//water';

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
      new Sand(
        this.assetManager,
        x,
        y,
        this.terrainBlockSize,
        this.terrainBlockSize,
      ),
      new Stone(
        this.assetManager,
        x,
        y,
        this.terrainBlockSize,
        this.terrainBlockSize,
      ),
    ];

    const danger = [
      new Lava(
        this.assetManager,
        x,
        y,
        this.terrainBlockSize,
        this.terrainBlockSize,
      ),
      new Water(
        this.assetManager,
        x,
        y,
        this.terrainBlockSize,
        this.terrainBlockSize,
      ),
    ];

    const wasDangerous = this.previousBlock && this.previousBlock.isDangerous();

    const dangerChance = wasDangerous && direction >= 0
      ? 8
      : 2

    const rnd = MathHelpers.randomIntegerBetween(0, 10);
    if (rnd < dangerChance) {
      return wasDangerous
        ? new (this.previousBlock.constructor)(this.assetManager, x, y, this.terrainBlockSize, this.terrainBlockSize)
        : danger[MathHelpers.randomIntegerBetween(0, danger.length - 1)];
    }
    return safe[MathHelpers.randomIntegerBetween(0, safe.length - 1)];
  }
}

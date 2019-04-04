import Sand from "./sand";
import MathHelpers from "../mathHelpers";
import Stone from "./stone";
import Lava from "./lava";
import Water from "./water";


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
        this.terrainBlockSize
      );
    }
    const lastY = this.previousBlock.y;

    const x = this.previousBlock.x + this.terrainBlockSize;
    const nextY =
      lastY +
      MathHelpers.randomIntegerBetween(-1, 1) * (this.terrainBlockSize / 2);
    const nextBlock = this.getRandom(x, nextY);
    this.previousBlock = nextBlock;
    return nextBlock;
  }

  getRandom(x, y) {
    const factories = [
      () => {
        return new Sand(this.assetManager,
          x, y,
          this.terrainBlockSize,
          this.terrainBlockSize);
      },
      () => {
        return new Stone(this.assetManager,
          x, y,
          this.terrainBlockSize,
          this.terrainBlockSize);
      },
      () => {
        return new Lava(this.assetManager,
          x, y,
          this.terrainBlockSize,
          this.terrainBlockSize);
      },
      () => {
        return new Water(this.assetManager,
          x, y,
          this.terrainBlockSize,
          this.terrainBlockSize);
      },
    ];
    return factories[Math.floor(Math.random() * factories.length)]();
  }
}
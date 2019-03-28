import Block from "./block";

const TERRAIN_BLOCK_SIZE = 64;
const WORLD_HEIGHT = 6;
const WORLD_TOP = 300;
const WORLD_BOTTOM = TERRAIN_BLOCK_SIZE * WORLD_HEIGHT + WORLD_TOP;

export default class World {
  constructor() {
    this.blocks = [];
    this.xOffset = 0;
    const BLOCK_COUNT = Math.ceil(1024 / TERRAIN_BLOCK_SIZE);

    for (let i = 0; i <= BLOCK_COUNT; i++) {
      this.addNextBlock();
    }
  }

  genRand(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  addNextBlock() {
    const lastBlock = this.blocks.slice(-1)[0];
    const lastY = lastBlock
      ? lastBlock.y
      : this.genRand(0, WORLD_HEIGHT) * TERRAIN_BLOCK_SIZE + WORLD_TOP;
    const x = lastBlock ? lastBlock.x + TERRAIN_BLOCK_SIZE : 0;
    const nextY = lastY + this.genRand(-1, 1) * (TERRAIN_BLOCK_SIZE / 2);
    const block = new Block(
      x,
      nextY < WORLD_TOP || nextY > WORLD_BOTTOM ? lastY : nextY,
      TERRAIN_BLOCK_SIZE,
      TERRAIN_BLOCK_SIZE
    );
    this.blocks.push(block);
  }

  draw(context) {
    context.fillStyle = "#f0f";
    context.fillRect(0, WORLD_TOP, 1024, 1);

    context.fillStyle = "#ff0";
    context.fillRect(0, WORLD_BOTTOM + TERRAIN_BLOCK_SIZE, 1024, 1);
    this.blocks.forEach(block => {
      block.draw(context, this.xOffset);
    });
  }

  updateDrawPosition(xAmount = -1) {
    this.xOffset += xAmount;

    if (this.blocks[0].right + this.xOffset < 0) {
      this.blocks = this.blocks.slice(1);
      this.addNextBlock();
    }
  }

  collision(block) {
    const collisions = [];
    for (let index = 0; index < this.blocks.length; index++) {
      const worldBlock = this.blocks[index];
      if (worldBlock.overlaps(block)) {
        collisions.push(worldBlock);
        if (collisions.length === 2) {
          break;
        }
      }
    }
    return collisions;
  }
}

import Block from "./block";

const TERRAIN_BLOCK_SIZE = 64;
const WORLD_HEIGHT = 6;
const WORLD_TOP = 300;
const WORLD_BOTTOM = TERRAIN_BLOCK_SIZE * WORLD_HEIGHT + WORLD_TOP;

export default class World {
  constructor() {
    this.blocks = [];
    this.xOffset = 0;
  }

  genRand(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  addNextBlock() {
    const x = this.blocks.length * TERRAIN_BLOCK_SIZE;
    const lastBlock = this.blocks.slice(-1)[0];
    const lastY = lastBlock
      ? lastBlock.y
      : this.genRand(0, WORLD_HEIGHT) * TERRAIN_BLOCK_SIZE + WORLD_TOP;
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
  }
}
import Block from "./block";
import MathHelpers from "./mathHelpers";

const TERRAIN_BLOCK_SIZE = 64;
const WORLD_HEIGHT = 5;
const WORLD_TOP = 350;
const WORLD_BOTTOM = TERRAIN_BLOCK_SIZE * WORLD_HEIGHT + WORLD_TOP;
const BLOCK_COUNT = Math.ceil(1024 / TERRAIN_BLOCK_SIZE);

export default class World {
  constructor() {
    this.blocks = [];

    for (let i = 0; i <= BLOCK_COUNT; i++) {
      this.addNextBlock();
    }
  }

  addNextBlock() {
    const lastBlock = this.blocks.slice(-1)[0];
    const lastY = lastBlock ?
      lastBlock.y :
      MathHelpers.randomIntegerBetween(0, WORLD_HEIGHT) * TERRAIN_BLOCK_SIZE + WORLD_TOP;
    const x = lastBlock ? lastBlock.position().x + TERRAIN_BLOCK_SIZE : 0;
    const nextY = lastY + MathHelpers.randomIntegerBetween(-1, 1) * (TERRAIN_BLOCK_SIZE / 2);
    const block = new Block(
      x,
      nextY < WORLD_TOP || nextY > WORLD_BOTTOM ? lastY : nextY,
      TERRAIN_BLOCK_SIZE,
      TERRAIN_BLOCK_SIZE
    );
    this.blocks.push(block);
  }

  draw(context) {
    this.blocks.forEach(block => {
      block.draw(context);
    });
  }

  updateDrawPosition(xAmount = -1) {
    this.blocks.forEach(b => b.move(b.position().x + xAmount, b.position().y));

    this.updateBlockList();
  }

  updateBlockList() {
      if (this.blocks[0].position().x < 0) {
        const {
          topRight
        } = this.blocks[0].points();

        if (topRight.x < 0) {
          this.blocks = this.blocks.slice(1);
          this.addNextBlock();
        }
      }

      collision(block) {
        const collisions = [];
        for (let index = 0; index < this.blocks.length; index++) {
          const worldBlock = this.blocks[index];
          if (worldBlock.overlaps(block)) {
            collisions.push({
              block: worldBlock
            });
            if (collisions.length === 2) {
              break;
            }
          }
          return collisions;
        }
      }

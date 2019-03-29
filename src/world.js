import Block from "./block";
import Cloud from "./cloud";

import TerrainBlock from "./terrainBlock";
import MathHelpers from "./mathHelpers";

const TERRAIN_BLOCK_SIZE = 128;
const WORLD_HEIGHT = 2;
const WORLD_TOP = 120;
const WORLD_BOTTOM = TERRAIN_BLOCK_SIZE * WORLD_HEIGHT + WORLD_TOP;
const BLOCK_COUNT = Math.ceil(1024 / TERRAIN_BLOCK_SIZE);

export default class World {
  constructor(assetManager) {
    this.blocks = [];
    this.clouds = [];
    this.assetManager = assetManager;
  }

  init() {
    for (let i = 0; i <= BLOCK_COUNT; i++) {
      this.addNextBlock();
      this.addNextCloud();
    }
  }

  addNextCloud() {
    const cloud = new Cloud(this.assetManager.getImage('cloud-1'), 1024, Math.random() * 600, Math.random() * 10);
    this.clouds.push(cloud);
    this.clouds = this.clouds.concat(cloud).sort((a, b) => b.distance - a.distance);
  }

  addNextBlock() {
    const lastBlock = this.blocks.slice(-1)[0];
    const lastY = lastBlock ?
      lastBlock.y :
      MathHelpers.randomIntegerBetween(0, WORLD_HEIGHT) * TERRAIN_BLOCK_SIZE +
      WORLD_TOP;
    const x = lastBlock ? lastBlock.x + TERRAIN_BLOCK_SIZE : 0;
    const nextY =
      lastY +
      MathHelpers.randomIntegerBetween(-1, 1) * (TERRAIN_BLOCK_SIZE / 2);
    const block = new TerrainBlock(
      this.assetManager.getImage(Math.random() > 0.5 ? 'sand' : 'lava'),
      x,
      nextY < WORLD_TOP || nextY > WORLD_BOTTOM ? lastY : nextY,
      TERRAIN_BLOCK_SIZE,
      TERRAIN_BLOCK_SIZE
    );
    this.blocks.push(block);
  }

  draw(context) {
    this.clouds.forEach(cloud => {
      cloud.draw(context);
    });
    this.blocks.forEach(block => {
      block.draw(context);
    });
  }

  updateDrawPosition(xAmount = -1) {
    this.blocks.forEach(b => b.move(b.x + xAmount, b.y));

    this.updateBlockList();
    this.updateClouds();

    this.clouds.forEach(cloud => cloud.updatePosition(xAmount / 2));
    // if math.random() > 0.9 then addCloud()
  }

  updateBlockList() {
    if (this.blocks[0].x < 0) {
      const {
        topRight
      } = this.blocks[0].points();

      if (topRight.x < 0) {
        this.blocks = this.blocks.slice(1);
        this.addNextBlock();
      }
    }

    // if any clouds off screen, remove them
  }

  updateClouds() {
    this.clouds.forEach((cloud, index) => {
      if (cloud.x + cloud.image.width < 0) {
        this.clouds.splice(index, 1);
        this.addNextCloud();
      }
    });
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
    }
    return collisions;
  }
}

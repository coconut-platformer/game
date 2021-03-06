import Cloud from './cloud';
import Coin from './coin';
import TerrainGenerator from './terrain/terrainGenerator';
import Block from './block';
import mathHelpers from '.';

const TERRAIN_BLOCK_SIZE = 128;

export default class World {
  constructor(assetManager, camera) {
    this.score = 0;
    this.blocks = [];
    this.clouds = [];
    this.coins = [];
    this.assetManager = assetManager;
    this.camera = camera;
    this.terrainGenerator = new TerrainGenerator(
      this.assetManager,
      1,
      TERRAIN_BLOCK_SIZE,
    );
    this.terrainSize = TERRAIN_BLOCK_SIZE;
  }

  init() {
    const count = this.camera.width / TERRAIN_BLOCK_SIZE + 12;
    for (let i = 0; i <= count; i++) {
      this.addNextBlock();
      this.addNextCloud(0);
    }
  }

  addNextCloud() {
    const cloudNames = ['cloud-1', 'cloud-2'];
    const cloudName = cloudNames[Math.floor(Math.random() * cloudNames.length)];
    const y =
      Math.random() * this.camera.height * 2 +
      this.camera.y -
      this.camera.height / 2;
    const cloud = new Cloud(
      this.assetManager.getImage(cloudName),
      this.camera.right() + Math.random() * this.camera.width * 2,
      y,
      Math.random() * 10,
    );
    this.clouds = this.clouds
      .concat(cloud)
      .sort((a, b) => b.distance - a.distance);
  }

  addNextBlock() {
    const block = this.terrainGenerator.getNextBlock();
    if (Math.random() < 0.3) {
      for (let i = 0; i < 3; i++) {
        this.coins.push(
          new Coin(block.x + 42 * i, block.y - 150, this.assetManager),
        );
      }
    }
    this.blocks.push(block);
  }

  draw(context) {

    context
      .atDepth('clouds', setZ => {
        context.withTransparency(0.8, () => {
          this.clouds.forEach(cloud => {
            setZ(cloud.distance);
            cloud.draw(context);
          });
        });
      })
      .atDepth('fg', () => {
        this.blocks.forEach(block => {
          block.draw(context);
        });
        this.coins.forEach(coin => {
          coin.draw(context);
        });
      });
  }

  tick(movement) {
    this.updateBlockList();
    this.updateClouds();
    this.clouds.forEach(cloud => cloud.updatePosition(movement / -10));
  }

  updateBlockList() {
    const padding = 8 * TERRAIN_BLOCK_SIZE;
    const left = this.camera.points().topLeft.x - padding;
    const original = this.blocks.length;
    this.blocks = this.blocks.filter(b => b.right() >= left);
    this.coins = this.coins.filter(b => b.right() >= left);
    const diff = original - this.blocks.length;
    for (let i = 0; i < diff; i++) {
      this.addNextBlock();
    }
  }

  updateClouds() {
    const padding = 2 * TERRAIN_BLOCK_SIZE;
    const left = this.camera.points().topLeft.x - padding;
    const original = this.clouds.length;
    this.clouds = this.clouds.filter(b => b.right() >= left);
    if (
      (original !== this.clouds.length || this.clouds.length === 0) &&
      Math.random() > 0.7
    ) {
      const count = Math.round(Math.random() * 5);
      for (let i = 0; i < count; i++) {
        this.addNextCloud();
      }
    }
  }

  collision(block) {
    const collisions = [];
    const collidable = [ ...this.blocks, ...this.coins ];
    for (let index = 0; index < collidable.length; index++) {
      const worldBlock = collidable[index];
      if (worldBlock.overlaps(block)) {
        if (worldBlock instanceof Coin) {
          this.removeCoin(worldBlock);
          this.adjustScore(worldBlock, 1);
        }
        collisions.push({
          block: worldBlock,
        });
      }
    }
    return collisions;
  }

  removeCoin(coin) {
    this.coins = this.coins.filter((c) => {
      return c !== coin;
    }); 
  }

  adjustScore(type, amount) {
    //we should be adjusting score here
    this.score += amount;
    console.log('adjustScore', type, amount);
  }
}

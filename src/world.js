import Cloud from "./cloud";
import TerrainGenerator from "./terrain/terrainGenerator";

const TERRAIN_BLOCK_SIZE = 128;

export default class World {
  constructor(assetManager, camera) {
    this.blocks = [];
    this.clouds = [];
    this.assetManager = assetManager;
    this.camera = camera;
    this.terrainGenerator = new TerrainGenerator(
      this.assetManager,
      1,
      TERRAIN_BLOCK_SIZE
    );
  }

  init() {
    const count = (this.camera.width / TERRAIN_BLOCK_SIZE) + 10;
    for (let i = 0; i <= count; i++) {
      this.addNextBlock();
      this.addNextCloud(0);
    }
  }

  addNextCloud() {
    const cloudNames = ["cloud-1", "cloud-2"];
    const cloudName = cloudNames[Math.floor(Math.random() * cloudNames.length)];
    const y = (Math.random() * this.camera.height * 2) + this.camera.y - (this.camera.height / 2);
    const cloud = new Cloud(
      this.assetManager.getImage(cloudName),
      this.camera.right() + Math.random() * this.camera.width * 2,
      y,
      Math.random() * 10
    );
    this.clouds = this.clouds
      .concat(cloud)
      .sort((a, b) => b.distance - a.distance);
  }

  addNextBlock() {
    this.blocks.push(this.terrainGenerator.getNextBlock());
  }

  draw(context) {
    this.updateBlockList();
    this.updateClouds();

    context
      .atDepth('clouds', (setZ) => {
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
      });
  }

  updateDrawPosition(xAmount = -1) {
    // this.blocks.forEach(b => b.move(b.x + xAmount, b.y));


    //     this.clouds.forEach(cloud => cloud.updatePosition(xAmount / 2));
  }

  updateBlockList() {
    const padding = 2 * TERRAIN_BLOCK_SIZE;
    const left = this.camera.points().topLeft.x - padding;
    const right = this.camera.right() + padding;
    const original = this.blocks.length;
    this.blocks = this.blocks.filter(b => b.right() >= left)
    const diff = original - this.blocks.length;
    for (let i = 0; i < diff; i++) {
      this.addNextBlock();
    }
  }

  updateClouds() {
    const padding = 2 * TERRAIN_BLOCK_SIZE;
    const left = this.camera.points().topLeft.x - padding;
    const right = this.camera.right() + padding;
    const original = this.clouds.length
    this.clouds = this.clouds.filter(b => b.right() >= left)
    if ((original !== this.clouds.length || this.clouds.length === 0) && Math.random() > 0.7) {
      const count = Math.round(Math.random() * 5)
      for (let i = 0; i < count; i++) {
        this.addNextCloud();
      }

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
    }
    return collisions;
  }
}

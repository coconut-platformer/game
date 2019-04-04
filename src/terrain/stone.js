import TerrainBlock from './terrainBlock.js';
import Shrub from './decorations/shrub';
import Rock from './decorations/rock';

export default class Stone extends TerrainBlock {
  constructor(assetManager, x, y, width, height) {
    super(assetManager.getImage('stone'), x, y, width, height);
    this.assetManager = assetManager;
    this.decorations = [
      new Rock(this.assetManager),
      new Rock(this.assetManager),
      new Rock(this.assetManager),
      new Rock(this.assetManager),
      new Rock(this.assetManager),
      new Shrub(this.assetManager),
    ];
    this.addRandomDecoration(0.2);
  }
}

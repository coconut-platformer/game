import Rock from './decorations/rock';
import Shrub from './decorations/shrub';
import TerrainBlock from './terrainBlock.js';

export default class Stone extends TerrainBlock {
  constructor(assetManager, x, y, width, height) {
    const stoneNames = ['stone', 'stone-2'];
    const stoneName = stoneNames[Math.floor(Math.random() * stoneNames.length)];
    super(assetManager.getImage(stoneName), x, y, width, height);
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

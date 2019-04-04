import Shrub from './decorations/shrub';
import Tree from './decorations/tree';
import TerrainBlock from './terrainBlock.js';

export default class Sand extends TerrainBlock {
  constructor(assetManager, x, y, width, height) {
    const sandNames = ['sand', 'sand-2'];
    const sandName = sandNames[Math.floor(Math.random() * sandNames.length)];
    super(assetManager.getImage(sandName), x, y, width, height);
    this.assetManager = assetManager;
    this.decorations = [
      new Shrub(this.assetManager),
      new Shrub(this.assetManager),
      new Tree(this.assetManager),
    ];
    this.addRandomDecoration(0.5);
  }
}

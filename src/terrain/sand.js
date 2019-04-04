import TerrainBlock from './terrainBlock.js';
import Shrub from './decorations/shrub';
import Tree from './decorations/tree';

export default class Sand extends TerrainBlock {
  constructor(assetManager, x, y, width, height) {
    super(assetManager.getImage('sand'), x, y, width, height);
    this.assetManager = assetManager;
    this.decorations = [
      new Shrub(this.assetManager),
      new Shrub(this.assetManager),
      new Tree(this.assetManager),
    ];
    this.addRandomDecoration(0.5);
  }
}

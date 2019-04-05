import TerrainBlock from './terrainBlock.js';

export default class Lava extends TerrainBlock {
  constructor(assetManager, x, y, width, height) {
    super(assetManager.getImage('lava'), x, y, width, height, true);
    this.assetManager = assetManager;
    //this.addRandomDecoration(0.1);
  }
}

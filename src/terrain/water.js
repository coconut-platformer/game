import TerrainBlock from "./terrainBlock.js";

export default class Water extends TerrainBlock {
  constructor(assetManager, x, y, width, height) {
    super(assetManager.getImage("water"), x, y, width, height);
    this.assetManager = assetManager;
    // this.addRandomDecoration(0.1);
  }
}
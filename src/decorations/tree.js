import BlockDecoration from "./blockDecoration";

export default class Tree extends BlockDecoration {
  constructor(assetManager, xOffset = -80, yOffset = 3, scalingFactor = 0.8) {
    super(assetManager.getImage("tree"), xOffset, yOffset, scalingFactor);
  }
}

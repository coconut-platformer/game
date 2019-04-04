import BlockDecoration from "./blockDecoration";

export default class Tree extends BlockDecoration {
  constructor(assetManager, xOffset = -120, yOffset = 3, scalingFactor = 1) {
    super(assetManager.getImage("tree"), xOffset, yOffset, scalingFactor);
  }
}

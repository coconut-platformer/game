import BlockDecoration from "./blockDecoration";

export default class Rock extends BlockDecoration {
  constructor(assetManager, xOffset = 5, yOffset = 5, scalingFactor = 0.8) {
    super(assetManager.getImage("rock"), xOffset, yOffset, scalingFactor);
  }
}

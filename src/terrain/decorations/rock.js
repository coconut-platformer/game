import BlockDecoration from "./blockDecoration";

export default class Rock extends BlockDecoration {
  constructor(assetManager, xOffset = 20, yOffset = 5, scalingFactor = 1) {
    super(assetManager.getImage("rock"), xOffset, yOffset, scalingFactor);
  }
}

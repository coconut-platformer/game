import BlockDecoration from "./blockDecoration";

export default class Shrub extends BlockDecoration {
  constructor(assetManager, xOffset = 30, yOffset = 5, scalingFactor = 0.5) {
    super(assetManager.getImage("shrub"), xOffset, yOffset, scalingFactor);
  }
}

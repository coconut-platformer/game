import BlockDecoration from "./blockDecoration";

export default class Umbrella extends BlockDecoration {
  constructor(assetManager, xOffset = -22, yOffset = 30, scalingFactor = 0.5) {
    super(assetManager.getImage("umbrella"), xOffset, yOffset, scalingFactor);
  }
}

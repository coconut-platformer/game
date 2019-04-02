import BlockDecoration from "./blockDecoration";

export default class Umbrella extends BlockDecoration {
  constructor(assetManager, xOffset = -70, yOffset = 50, scalingFactor = 0.5) {
    super(assetManager.getImage("umbrella"), xOffset, yOffset, scalingFactor);
  }
}

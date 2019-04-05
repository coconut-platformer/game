import BlockDecoration from "./blockDecoration";

export default class Hut extends BlockDecoration {
  constructor(assetManager, xOffset = 0, yOffset = 5, scalingFactor = 0.5) {
    super(assetManager.getImage("hut"), xOffset, yOffset, scalingFactor);
  }
}

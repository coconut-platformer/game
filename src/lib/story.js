export default class Story {
  constructor(timer, context, camera, assetManager, tweenManager) {
    this.timer = timer;
    this.context = context;
    this.camera = camera;
    this.assetManager = assetManager;
    this.tweenManager = tweenManager;
  }

  onInit() {
  }

  onDeinit() {
  }

  onTick() {
    // Subclass
  }
}

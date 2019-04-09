import StoryManager from './lib/storyManager';
import Story from './lib/story';
import World from './world';

class WorldStory extends Story {
  constructor(timer, context, camera, assetManager, tweenManager) {
    super(timer, context, camera, assetManager, tweenManager);

    this.keyDown = this.keyDown.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.blur = this.blur.bind(this);

    this.keys = {};

    this.world = new World(this.assetManager, this.camera);
  }

  moveLeft() {
  }

  moveRight() {
  }

  keyDown(e) {
    this.keys[e.key] = true;
  }

  keyUp(e) {
    this.keys[e.key] = false;
  }

  blur() {
    this.keys = {};
  }

  onInit() {
    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('keyup', this.keyUp);
    window.addEventListener('blur', this.blur);
  }

  onDeinit() {
    document.removeEventListener('keydown', this.keyDown);
    document.removeEventListener('keyup', this.keyUp);
    window.removeEventListener('blur', this.blur);
  }

  onTick() {
  }
}

StoryManager.register('world', WorldStory);

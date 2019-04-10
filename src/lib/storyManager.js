import Timer from '../timer';
import RenderContext from '../renderContext';
import Camera from '../camera';
import AssetManager from '../assetManager';
import TweenManager from '../tweenManager';
import Story from './story';

class StoryManager {
  constructor(canvas) {
    this.tickFn = null;
    this.tickHandle = null;
    this.canvas = canvas;
    this.stories = {};
    this.story = new Story();
    this.context = new RenderContext(this.canvas, { x: 0, y: 0 });
    this.assetManager = new AssetManager();
    this.tweenManager = new TweenManager();
    this.onChangeFn = () => {};
  }

  onChange(fn) {
    this.onChangeFn = fn;
  }

  register(name, klass) {
    this.stories[name] = klass;
    return this;
  }

  listStories() {
    return Object.keys(this.stories).map(name => ({
      name,
      active: this.story instanceof this.stories[name],
      view: () => this.viewStory(this.stories[name]),
    }));
  }

  viewStory(klass) {
    cancelAnimationFrame(this.tickHandle);
    this.context.fillStyle = '#fff';
    this.context
      .fillRect(0, 0, this.canvas.width, this.canvas.height)
      .commit();

    if (this.story) this.story.onDeinit();

    this.assetManager.load()
      .then(() => {
        const camera = new Camera(this.canvas.width, this.canvas.height);
        this.story = new klass(
          new Timer(),
          new RenderContext(this.canvas, camera),
          camera,
          this.assetManager,
          this.tweenManager,
        );

        this.onChangeFn();

        this.story.onInit();
        this.scheduleTick();
      });
  }

  scheduleTick() {
    this.tickHandle = requestAnimationFrame(v => this.tick(v));
  }

  tick(timestamp) {
    this.story.timer.addTime(timestamp);
    this.story.onTick();

    this.scheduleTick();
  }
}

export default new StoryManager(document.getElementById('game'));

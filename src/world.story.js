import StoryManager from './lib/storyManager';
import Story from './lib/story';
import World from './world';

class WorldStory extends Story {
  constructor(timer, context, camera, assetManager, tweenManager) {
    super(timer, context, camera, assetManager, tweenManager);

    this.overlay = this.context.cloneWithCamera({ x: 0, y: 0 });

    this.keyDown = this.keyDown.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.blur = this.blur.bind(this);

    this.keys = {};

    this.world = new World(this.assetManager, this.camera);

    this.controls = document.querySelector('#controls');
  }

  nextX(rate) {
    return (
      this.camera.x +
      (this.keys.ArrowLeft ? -rate : 0) +
      (this.keys.ArrowRight ? rate : 0)
    );
  }

  nextY(rate) {
    return (
      this.camera.y +
      (this.keys.ArrowUp ? -rate : 0) +
      (this.keys.ArrowDown ? rate : 0)
    );
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

    this.context.addDepth('bg', 100);
    this.context.addDepth('fg', 0);
    this.context.addDepth('clouds', -2);
    this.context.addDepth('overlay', -100);

    this.world.init();
    console.log('init');
  }

  onDeinit() {
    this.controls.innerHTML = '';
    document.removeEventListener('keydown', this.keyDown);
    document.removeEventListener('keyup', this.keyUp);
    window.removeEventListener('blur', this.blur);
  }

  onTick() {
    const delta = this.timer.getDelta();
    const buffer = 10;

    this.overlay.fillStyle = '#fff';
    this.overlay
      .fillRect(-buffer, -buffer, this.camera.width + (buffer * 2), this.camera.height + (buffer * 2))
      .commit();

    this.camera.move(this.nextX(0.5 * delta), this.nextY(0.5 * delta));

    this.world.draw(this.context);
    this.context.commit();
  }
}

StoryManager.register('world', WorldStory);

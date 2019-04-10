import StoryManager from './lib/storyManager';
import Story from './lib/story';
import World from './world';
import Coconut from './coconut';
import Sand from './terrain/sand';
import Human from './human';

class CoinStory extends Story {
  constructor(timer, context, camera, assetManager, tweenManager) {
    super(timer, context, camera, assetManager, tweenManager);

    this.overlay = this.context.cloneWithCamera({ x: 0, y: 0 });

    this.blur = this.blur.bind(this);

    this.keys = {};

    this.world = new World(this.assetManager, this.camera);
    //
    // this.player = new Human(
    //   new Coconut(this.assetManager.getImage('coconut')),
    //   this.assetManager,
    // );
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

    // this.world.blocks.push(
    //   new Sand(
    //     this.assetManger,
    //     508,
    //     600,
    //     this.world.terrainSize,
    //     this.world.terrainSize,
    //   ),
    // );
  }

  onDeinit() {
    this.controls.innerHTML = '';
    document.removeEventListener('keydown', this.keyDown);
    document.removeEventListener('keyup', this.keyUp);
    window.removeEventListener('blur', this.blur);
  }

  onTick() {
    // const delta = this.timer.getDelta();
    // const buffer = 10;
    //
    // this.overlay.fillStyle = '#fff';
    // this.overlay
    //   .fillRect(
    //     -buffer,
    //     -buffer,
    //     this.camera.width + buffer * 2,
    //     this.camera.height + buffer * 2,
    //   )
    //   .commit();
    //
    // this.camera.stepTowards(this.player.avatar);
    //
    // this.world.draw(this.context);
    // this.context.commit();
  }
}

StoryManager.register('coin', CoinStory);

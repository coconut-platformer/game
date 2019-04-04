import Ai from './ai.js';
import AssetManager from './assetManager';
import Camera from './camera';
import Coconut from './coconut';
import Human from './human.js';
import Physics from './physics';
import RenderContext from './renderContext';
import Timer from './timer';
import World from './world';

export default class Game {
  constructor(canvas, worldRate = 0.2) {
    this.canvas = canvas;
    this.camera = new Camera(this.canvas.width, this.canvas.height);
    this.context = new RenderContext(this.canvas, this.camera);
    this.hud = new RenderContext(this.canvas, { x: 0, y: 0 });
    this.context.addDepth('bg', 100);
    this.context.addDepth('fg', 0);
    this.context.addDepth('clouds', -2);
    this.context.addDepth('overlay', -100);

    this.assetManager = new AssetManager();
    this.timestep = 1000 / 60;
    this.timer = new Timer();
    this.world = new World(this.assetManager, this.camera);
    this.worldRate = worldRate;
    this.gravity = {
      x: 0,
      y: 0.2,
    };
    this.physics = new Physics(this.gravity, 0.98, this.world);
    this.keyPressed = false;
    this.keyUp = false;
  }

  start() {
    this.assetManager
      .selectImages([
        'coconut',
        'lava',
        'sand',
        'sand-2',
        'stone',
        'stone-2',
        'sky',
        'cloud-1',
        'cloud-2',
        'rock',
        'tree',
        'shrub',
        'umbrella',
        'water',
        'title',
      ])
      .load()
      .then(() => this.runGame())
      .catch(console.error);
  }

  runGame() {
    this.world.init();
    this.coconut = new Coconut(this.assetManager.getImage('coconut')),
    this.player = new Ai(
      this.coconut,
      this.assetManager,
    );
    this.camera.centerOn(this.player.avatar);
    this.cameraTarget = this.player.avatar.position();

    this.toggleOnSpace();

    this.tick();
  }

  toggleOnSpace() {
    const onSpace = (e) => {
      console.log(e.repeat);
      if (e.key === ' ') {
        console.log('toggleOnSpace', this.player);
        document.removeEventListener('keydown', onSpace);
        this.toggleControl();
      }
    }

    document.addEventListener('keydown', onSpace);
  }

  toggleControl() {
    this.player.cleanup();
    if (this.player instanceof Human) {
      this.player = new Ai(this.coconut, this.assetManager);
      this.toggleOnSpace();
    } else {
      this.player = new Human(this.coconut, this.assetManager);
    }
    this.coconut.cancel();
    this.coconut.interact(this.assetManager);
  }

  tick(timestamp) {
    this.timer.addTime(timestamp);
    const movement = this.timer.getDelta();
    if (movement > 250) {
      this.timer.drainAccumulator(this.timestep, () => {});
      requestAnimationFrame(ts => this.tick(ts));
    }

    this.player.avatar.advance(movement * this.worldRate);
    this.player.tick(this.world.blocks);

    this.context.atDepth('bg', () => {
      this.context.drawImage(
        this.assetManager.getImage('sky'),
        this.camera.x,
        this.camera.y,
        this.camera.width + 20,
        this.camera.height + 20,
      );
    });
    this.world.draw(this.context);
    this.context.atDepth('fg', () => {
      this.player.avatar.draw(this.context);
    });

    this.timer.drainAccumulator(this.timestep, () => {
      this.physics.integrate([this.player.avatar], this.timestep);
    });
    if (this.player instanceof Ai) {
      this.cameraTarget = this.player.avatar.position();
    } else {
      this.cameraTarget.x = Math.max(this.cameraTarget.x + (movement * this.worldRate * 2), this.player.avatar.x);
      this.cameraTarget.y = this.player.avatar.y;
    }

    if (this.player instanceof Human && this.player.avatar.x < this.camera.x) {
      this.toggleControl();
    }

    this.camera.stepTowards(this.cameraTarget);

    this.context.commit();
    this.hud.drawImage(this.assetManager.getImage('title'), 8, 0, 1008, 273).commit();


    requestAnimationFrame(ts => this.tick(ts));
  }
}

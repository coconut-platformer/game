import Ai from './ai.js';
import AssetManager from './assetManager';
import Camera from './camera';
import Coconut from './coconut';
import Human from './human.js';
import Physics from './physics';
import RenderContext from './renderContext';
import Timer from './timer';
import World from './world';
import TweenManager from './tweenManager';

export default class Game {
  constructor(canvas, worldRate = 0.3) {
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
    this.tweenManager = new TweenManager();

    this.showHud = false;

    this.time = 0;
    this.history = [];

    window.addEventListener('blur', () => this.onBlur());
    window.addEventListener('focus', () => this.onFocus());
  }

  start() {
    this.assetManager
      .selectImages([
        'hut',
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
        'space-button',
      ])
      .load()
      .then(() => this.runGame())
      .catch(console.error);
  }

  runGame() {
    this.world.init();
    this.coconut = new Coconut(this.assetManager.getImage('coconut')),
    this.player = new Human(
      this.coconut,
      this.assetManager,
    );
    this.camera.centerOn(this.player.avatar);
    this.cameraTarget = this.player.avatar.position();

    this.tick();
    this.toggleControl();
  }

  toggleOnSpace() {
    const onSpace = (e) => {
      if (e.key === ' ') {
        document.removeEventListener('keydown', onSpace);
        this.toggleControl();
      }
    }

    document.addEventListener('keydown', onSpace);
  }

  toggleControl() {
    this.player.cleanup();
    if (this.player instanceof Human) {
      if (this.time > 0) {
        this.history.push(this.time);
      }
      this.player = new Ai(this.coconut, this.assetManager);
      this.toggleOnSpace();
      this.tweenManager.tween(300, 0.0, 1.0, v => this.drawHud(v), () => this.showHud = true);
    } else {
      this.showHud = false;
      this.player = new Human(this.coconut, this.assetManager);
      this.tweenManager.tween(300, 1.0, 0.0, v => this.drawHud(v));
      this.time = 0;
    }
    this.coconut.cancel();
    this.coconut.interact(this.assetManager);
  }

  onBlur() {
    cancelAnimationFrame(this.handle);
  }

  onFocus() {
    this.timer = new Timer();
    this.tick();
  }

  tick(timestamp) {
    this.timer.addTime(timestamp);
    const movement = this.timer.getDelta();
    if (this.player instanceof Human) {
      this.time += movement;
    }

    this.player.avatar.advance(movement * this.worldRate);
    this.player.tick(this.world.blocks);

    this.world.tick(movement)

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
      this.cameraTarget.x = Math.max(this.cameraTarget.x + (movement * this.worldRate * 1.8), this.player.avatar.x);
      this.cameraTarget.y = this.player.avatar.y;
    }

    if (this.player instanceof Human && this.player.avatar.right() < this.camera.x) {
      this.toggleControl();
    }

    this.camera.stepTowards(this.cameraTarget);

    this.context.commit();

    if (this.player instanceof Ai && this.showHud) {
      this.drawHud();
    }

    this.tweenManager.tick(movement);

    this.handle = requestAnimationFrame(ts => this.tick(ts));

  }

  drawHud(baseTransparency = 1.0) {
    this.hud
      .withTransparency(baseTransparency * 0.7, () => {
        this.hud.fillStyle = '#000';
        this.hud.fillRect(0, 0, 1024, 768);
      })
      .withTransparency(baseTransparency, () => {
        this.hud
          .drawImage(this.assetManager.getImage('title'), 8, 0, 1008, 273)
        const best = this.history.reduce((max, time) => Math.max(max, time), 0);
        const latest = this.history[this.history.length - 1];
        if (latest) {
          this.hud.fillStyle = 'white';
          this.hud.font = '16px sans-serif';
          this.hud.drawText(`Current Time: ${latest.toFixed(2)}ms`, 800, 350);
          if (best > 0) {
            this.hud.fillStyle = 'white';
            this.hud.font = '16px sans-serif';
            this.hud.drawText(`Best Time: ${best.toFixed(2)}ms`, 800, 400);
          }

        }
      })
      .withTransparency(baseTransparency * 0.7, () => {
        this.hud.drawImage(this.assetManager.getImage('space-button'), 190, 570, 644, 189)
      })
      .commit();
  }
}

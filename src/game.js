import AssetManager from "./assetManager";
import Coconut from "./coconut";
import Physics from "./physics";
import World from "./world";
import Timer from "./timer";
import Cloud from './cloud';

export default class Game {
  constructor(canvas, worldRate = -0.2) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.assetManager = new AssetManager();
    this.timestep = 1000 / 60;
    this.timer = new Timer();
    this.world = new World(this.assetManager);
    this.worldRate = worldRate;
    this.gravity = {
      x: 0,
      y: 0.2
    };
    this.physics = new Physics(this.gravity, 0.98, this.world);
  }

  start() {
    this.assetManager
      .selectImages(['coconut', 'lava', 'sand', 'stone', 'sky', 'cloud-1', 'cloud-2'])
      .load()
      .then(() => this.runGame())
      .catch(console.error);
  }

  runGame() {
    this.world.init();
    this.coconut = new Coconut(this.assetManager.getImage("coconut"));

    document.addEventListener("keydown", e => {
      if (e.key === " ") {
        this.coconut.jump();
      }
    });

    this.tick();
  }

  tick(timestamp) {
    this.timer.addTime(timestamp);
    const movement = this.timer.getDelta();

    this.context.drawImage(this.assetManager.getImage('sky'), 0, 0, 1024, 768);
    this.world.draw(this.context);
    this.coconut.draw(this.context);

    this.timer.drainAccumulator(this.timestep, () => {
      this.physics.integrate(this.coconut, this.timestep);
    });

    this.world.updateDrawPosition(movement * this.worldRate);

    requestAnimationFrame((ts) => this.tick(ts));
  };
}

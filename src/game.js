import AssetManager from "./assetManager";
import Coconut from "./coconut";
import Physics from "./physics";
import World from "./world";
import Timer from "./timer";
import Cloud from "./cloud";
import RenderContext from "./renderContext";

export default class Game {
  constructor(canvas, worldRate = -0.2) {
    this.canvas = canvas;
    this.context = new RenderContext(this.canvas);
    this.context.addDepth("bg", 100);
    this.context.addDepth("fg", 0);
    this.context.addDepth("clouds", -2);
    this.context.addDepth("overlay", -100);
    this.context.addDepth("hud", -200);

    this.assetManager = new AssetManager();
    this.timestep = 1000 / 60;
    this.timer = new Timer();
    this.world = new World(this.assetManager, this.context);
    this.worldRate = worldRate;
    this.gravity = {
      x: 0,
      y: 0.2
    };
    this.physics = new Physics(this.gravity, 0.98, this.world);
    this.keyPressed = false;
    this.keyUp = false;
  }

  start() {
    this.assetManager
      .selectImages([
        "coconut",
        "lava",
        "sand",
        "stone",
        "sky",
        "cloud-1",
        "cloud-2",
        "rock",
        "tree",
        "shrub",
        "umbrella"
      ])
      .load()
      .then(() => this.runGame())
      .catch(console.error);
  }

  runGame() {
    this.world.init();
    this.coconut = new Coconut(this.assetManager.getImage("coconut"));

    document.addEventListener("keydown", e => {
      if (e.key === " ") {
        this.keyPressed = true;
      }
    });

    document.addEventListener("keyup", e => {
      if (e.key === " ") {
        this.keyPressed = false;
        this.keyUp = true;
      }
    });

    this.tick();
  }

  tick(timestamp) {
    this.timer.addTime(timestamp);
    const movement = this.timer.getDelta();

    if (this.keyPressed) {
      this.coconut.interact(this.assetManager);
    }

    if (this.keyUp) {
      this.coconut.cancel();
      this.keyUp = false;
    }

    this.context.atDepth("bg", () => {
      this.context.drawImage(
        this.assetManager.getImage("sky"),
        0,
        0,
        1024,
        768
      );
    });
    this.world.draw(this.context);
    this.context.atDepth("fg", () => {
      this.coconut.draw(this.context);
    });
    this.context.commit();

    this.timer.drainAccumulator(this.timestep, () => {
      this.physics.integrate([this.coconut], this.timestep);
    });

    this.world.updateDrawPosition(movement * this.worldRate);

    requestAnimationFrame(ts => this.tick(ts));
  }
}

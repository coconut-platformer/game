import Ai from "./ai.js";
import Human from "./human.js";
import AssetManager from "./assetManager";
import Coconut from "./coconut";
import Physics from "./physics";
import World from "./world";
import Timer from "./timer";
import Cloud from "./cloud";
import RenderContext from "./renderContext";
import Camera from "./camera";

export default class Game {
  constructor(canvas, worldRate = 0.2) {
    this.canvas = canvas;
    this.camera = new Camera(this.canvas.width, this.canvas.height);
    this.context = new RenderContext(this.canvas, this.camera);
    this.context.addDepth("bg", 100);
    this.context.addDepth("fg", 0);
    this.context.addDepth("clouds", -2);
    this.context.addDepth("overlay", -100);
    this.context.addDepth("hud", -200);

    this.assetManager = new AssetManager();
    this.timestep = 1000 / 60;
    this.timer = new Timer();
    this.world = new World(this.assetManager, this.camera);
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
        "umbrella",
        "water",
      ])
      .load()
      .then(() => this.runGame())
      .catch(console.error);
  }

  runGame() {
    this.world.init();
    this.ai = new Ai(
      new Coconut(this.assetManager.getImage("coconut")),
      this.assetManager
    );
    this.player = new Human(
      new Coconut(this.assetManager.getImage("coconut")),
      this.assetManager
    );
    this.camera.centerOn(this.player.avatar);

    this.tick();
  }

  tick(timestamp) {
    this.timer.addTime(timestamp);
    const movement = this.timer.getDelta();

    this.ai.avatar.advance(movement * this.worldRate);
    this.ai.tick(this.world.blocks);

    this.player.avatar.advance(movement * this.worldRate);
    this.player.tick(this.world.blocks);

    this.context.atDepth("bg", () => {
      this.context.drawImage(
        this.assetManager.getImage("sky"),
        this.camera.x,
        this.camera.y,
        this.camera.width + 20,
        this.camera.height + 20
      );
    });
    this.world.draw(this.context);
    this.context.atDepth("fg", () => {
      this.context.withTransparency(0.5, () => {
        this.ai.avatar.draw(this.context);
      });
      this.player.avatar.draw(this.context);
    });

    this.timer.drainAccumulator(this.timestep, () => {
      this.physics.integrate(
        [this.ai.avatar, this.player.avatar],
        this.timestep
      );
    });
    this.camera.stepTowards(this.player.avatar);

    this.context.commit();

    requestAnimationFrame(ts => this.tick(ts));
  }
}

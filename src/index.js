import AssetManager from "./assetManager";
import Coconut from "./coconut";
import Physics from "./physics";
import World from "./world";
import Timer from "./timer";

import coconutImage from "./assets/coconut.png";

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");


const assetManager = new AssetManager();
assetManager
  .loadImages([{
    name: "coconut",
    src: coconutImage
  }])
  .then(runGame)
  .catch(console.error);

function runGame() {
  const coconut = new Coconut(assetManager.getImage("coconut"));
  const physics = new Physics(5, 2, world);
  const timestep = 1000 / 60;
  const timer = new Timer();
  const world = new World();
  const gravity = {
    x: 0,
    y: .2
  };
  const physics = new Physics(gravity, 0.98, world);

  document.addEventListener("keydown", e => {
    if (e.key === " ") {
      coconut.jump();
    }
  });

  const tick = (timestamp) => {
    timer.addTime(timestamp);
    const movement = timer.getDelta();

    context.fillStyle = "#fff";
    context.fillRect(0, 0, 1024, 768);
    world.draw(context);
    coconut.draw(context);
    timer.drainAccumulator(timestep, () => {
      physics.integrate(coconut, timestep);
    });
    world.updateDrawPosition(movement * -0.2);
    requestAnimationFrame(tick);
  };

  tick();
}

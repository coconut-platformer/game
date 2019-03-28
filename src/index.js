import AssetManager from "./assetManager";
import Coconut from "./coconut";
import Physics from "./physics";
import World from "./world";

import coconutImage from "./assets/coconut.png";

const canvas = document.getElementById("game");

const ctx = canvas.getContext("2d");

const drawGround = xOffset => {
  ctx.fillStyle = "#aa0";
  ctx.fillRect(0, 600, 1024, 168);

  ctx.strokeStyle = "#000";
  for (let x = xOffset; x < 1024; x += 20) {
    ctx.strokeRect(x, 600, 1, 168);
  }
};

const assetManager = new AssetManager();
assetManager
  .loadImages([{ name: "coconut", src: coconutImage }])
  .then(runGame)
  .catch(console.error);

function runGame() {
  let coconut = new Coconut(assetManager.getImage("coconut"));
  let world = new World();
  // let physics = new Physics(5, 2, level);

  // for (let i = 0; i < 100; i++) {
  //   world.addNextBlock();
  // }

  document.addEventListener("keydown", e => {
    if (e.key === " ") {
      coconut.jump();
    }
  });

  const tick = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 1024, 768);
    world.draw(ctx);
    world.updateDrawPosition();
    coconut.draw(ctx, 0);
    // coconut.next(physics);
    requestAnimationFrame(tick);
  };

  tick();
}

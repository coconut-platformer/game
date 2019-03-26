import Coconut from './coconut';
import Physics from './physics';
import Terrain from './terrain';
const canvas = document.getElementById('game');

const ctx = canvas.getContext('2d');

const drawGround = (xOffset) => {
  ctx.fillStyle = '#aa0';
  ctx.fillRect(0, 600, 1024, 168);

  ctx.strokeStyle = '#000';
  for (let x = xOffset; x < 1024; x += 20) {
    ctx.strokeRect(x, 600, 1, 168);
  }
};


let coconut = new Coconut(0);
let level = Array.from({ length: 10 }).map((_, x) => {
  return new Terrain(x * 100, 600);
})
let physics = new Physics(5, 2, level);
let groundOffset = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === ' ') {
    coconut.jump();
  }
})

const tick = () => {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 1024, 600);
  drawGround(groundOffset);
  coconut.draw(groundOffset, ctx);
  groundOffset -= 1;
  coconut.next(physics);
  requestAnimationFrame(tick);
};

tick();
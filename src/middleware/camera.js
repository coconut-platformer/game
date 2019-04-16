import Middleware from './base';

export default class CameraMovementMiddleware extends Middleware {
  create() {
    this.x = 0;
    this.y = 0;
  }

  tick(game) {
    this.x += game.timer.getDelta() * this.config.speed;
    game.camera.stepTowards({ x: this.x, y: this.y });
  }

  onMessage(game, message) {
    switch (message.type) {
      case 'terrain': {
        const block = message.terrain.find(b => {
          return b.x >= this.x;
        });
        this.y = block.y;
        return;
      }

    }
  }
}

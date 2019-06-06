export default class GameMiddleware {
  constructor(config = {}) {
    this.messageListener = null;
    this.config = config;
  }

  connect(game) {
    this.messageListener = game.messageQueue;
  }

  create(game) {}
  destroy(game) {}
  render(game) {}
  tick(game) {}
  onMessage(game, message) {}

  sendMessage(message) {
    if (!this.messageListener) return;
    this.messageListener(message, this);
  }
}

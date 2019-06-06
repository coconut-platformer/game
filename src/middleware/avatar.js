import Middleware from './base';
import Avatar from '../objects/avatar';
import Juice from '../mechanics/juice';
import Counter from '../mechanics/counter';

export default class AvatarMiddleware extends Middleware {
  create(game) {
    this.avatar = new Avatar(
      game.assetManager.getImage(this.config.assetName),
      0,
      0,
    );

    this.juice = new Juice(100);
    this.coins = new Counter(game.assetManager.getImage('coin'));
  }

  tick(game) {
    this.juice.adjust(game.timer.getDelta() * -0.001);
    this.coins.collect(game.timer.getDelta() * 0.1);

    // If interaction just started, jump or umbrella
    // if interaction ended, remove umbrella
  }

  render(game) {
    this.avatar.render(game.context);
    this.juice.render(game.context);
    this.coins.render(game.context);
  }

  onMessage(game, message) {
    // listen for interactionStart with id === config.id
    // listen for interactionEnd with id === config.id
  }
}

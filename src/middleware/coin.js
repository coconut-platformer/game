import Middleware from './base';
import CoinGenerator from '../generators/coin';

export default class CoinGeneratorMiddleware extends Middleware {
  create(game) {
    this.generator = new CoinGenerator(
      game.assetManager,
      'CURRENTLY UNUSED SEED',
      this.config.rarity,
    );

    this.lastBlock = null;
    this.coins = [];
  }

  updateCoins(camera, terrain) {
    let coin = this.coins[0];
    while (coin && camera.x > coin.right()) {
      this.coins.shift();
      coin = this.coins[0];
    }

    const lastBlock = terrain.find(b => b.x > camera.right());
    if (lastBlock && this.lastBlock !== lastBlock) {
      const coins = this.generator.getNextCoins(lastBlock);
      for (let newCoin of coins) {
        this.coins.push(newCoin);
      }
      this.lastBlock = lastBlock;
    }
  }

  render(game) {
    game.context
      .withTransform(game.camera, () => {
        game.context.atDepth('fg', () => {
          this.coins.forEach(c => c.draw(game.context));
        });
      });
  }

  onMessage(game, message) {
    switch (message.type) {
      case 'terrain':
        return this.updateCoins(game.camera, message.terrain);

      case 'collision':
        // TODO: If player+coin, remove coin
        break;
    }
  }
}


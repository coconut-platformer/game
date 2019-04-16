import Coin from '../objects/coin';

export default class CoinGenerator {
  constructor(assetManager, seed, rarity) {
    this.assetManager = assetManager;
    this.seed = seed;
    this.rarity = rarity;
  }

  getNextCoins(block) {
    if (Math.random() > this.rarity) return [];

    const coins = [];
    for (let x = 0; x < 3; x += 1) {
      coins.push(new Coin(block.x + 42 * x, block.y - 150, this.assetManager));
    }
    return coins;
  }
}

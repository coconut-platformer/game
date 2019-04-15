// import Game from './game';
//
// const game = new Game(document.getElementById('game'));
// game.start();

import Game from './gamePipeline';
import TerrainGenerator from './terrainGeneratorMiddleware';

const game = new Game(document.querySelector('canvas#game'));
game
  .with(new TerrainGenerator())
  .start();

import Game from './gamePipeline';
import Terrain from './middleware/terrain';
import Coins from './middleware/coin';
import CameraMovement from './middleware/camera';

const game = new Game(document.querySelector('canvas#game'));
game
  .with(new Terrain({ size: 128 }))
  .with(new Coins({ rarity: 0.2 }))
  .with(new CameraMovement({ speed: 0.3 }))
  // .with(new Player({ id: 'human', key: ' ' })
  // .with(new Avatar({ id: 'human' })
  // .with(new Physics()
  .start();

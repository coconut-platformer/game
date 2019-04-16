import Game from './gamePipeline';
import TerrainMiddleware from './middleware/terrain';
import CoinsMiddleware from './middleware/coin';
import CameraMovementMiddleware from './middleware/camera';
import HumanMiddleware from './middleware/human';
import AvatarMiddleware from './middleware/avatar';

const game = new Game(document.querySelector('canvas#game'));
game
  .with(new TerrainMiddleware({ size: 128 }))
  .with(new CoinsMiddleware({ rarity: 0.2 }))
  .with(new CameraMovementMiddleware({ speed: 0.3 }))
  .with(new HumanMiddleware({ id: 'human', key: ' ' }))
  .with(new AvatarMiddleware({ assetName: 'coconut' }))
  // .with(new Physics()
  .start();

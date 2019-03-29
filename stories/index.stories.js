import {
  document,
  console
} from "global";
import {
  storiesOf
} from "@storybook/html";
import Game from "../src/game";

storiesOf("physics/coconut", module).add("gravity", () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 768;
  const game = new Game(canvas);
  // TODO:
  // Seed blocks for world
  // Position coconut onto block
  game.start();
  return canvas;
});

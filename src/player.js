export default class Player {
  constructor(avatar) {
    this.avatar = avatar;
    this.avatar.juice = 100;
  }
  cleanup() {}

  tick(terrainBlocks) {}
}

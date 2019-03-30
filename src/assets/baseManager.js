export default class BaseManager {
  constructor() {
    this.selected = [];
    this.loaded = {};

    this.loadAsset = this.loadAsset.bind(this);
  }

  select(assets) {
    this.selected = this.selected.concat(assets);
  }

  loadAsset(name) {
    return Promise.reject();
  }

  load() {
    return Promise.all(this.selected.map(this.loadAsset));
  }

  get(name) {
    return this.loaded[name];
  }
}

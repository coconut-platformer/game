export default class BaseManager {
  constructor() {
    this.selected = [];
    this.loadAsset = this.loadAsset.bind(this);
  }

  loadAsset(name) {
    return Promise.reject();
  }

  load() {
    return Promise.all(this.selected.map(this.loadAsset));
  }

  get() {
    return null;
  }
}

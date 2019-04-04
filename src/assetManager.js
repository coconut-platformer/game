import ImageManager from './assets/imageManager';

export default class AssetManager {
  constructor() {
    this.assets = {
      images: new ImageManager(),
    };
  }

  selectImages(images) {
    this.assets.images.select(images);
    return this;
  }

  load() {
    return Promise.all([this.assets.images.load()]);
  }

  getImage(name) {
    return this.assets.images.get(name);
  }
}

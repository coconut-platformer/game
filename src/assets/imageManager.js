import BaseManager from './baseManager';
import imageAssets from './images/*.png';

export default class ImageAssetManager extends BaseManager {
  constructor() {
    super();
    this.selected = Object.keys(imageAssets);
    this.loaded = {};
  }

  loadAsset(name) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageAssets[name];

      img.onload = () => {
        this.loaded[name] = img;
        resolve();
      };
      img.onerror = () => reject();
    });
  }


  get(name) {
    return this.loaded[name];
  }
}

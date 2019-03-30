import BaseManager from './baseManager';
import imageAssets from './images/*.png';

export default class ImageAssetManager extends BaseManager {
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
}


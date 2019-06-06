import ImageManager from './assets/imageManager';
import AudioManager from './assets/audioManager';

export default class AssetManager {
  constructor() {
    this.assets = {
      images: new ImageManager(),
      audio: new AudioManager(),
    };
  }

  selectImages(images) {
    this.assets.images.select(images);
    return this;
  }

  load() {
    return Promise.all([
      this.assets.images.load(),
      this.assets.audio.load(),
    ]);
  }

  getImage(name) {
    return this.assets.images.get(name);
  }

  playAudio(name, done = () => {}) {
    return this.assets.audio.play(name, done);
  }
}

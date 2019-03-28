export default class AssetManager {
  constructor() {
    this.assets = {
      images: {}
    };
  }

  loadImages(images) {
    return Promise.all(images.map(image => this.loadImage(image)));
  }

  loadImage({ name, src }) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;

      this.assets.images[name] = img;

      console.log("loadImage", name, src);

      img.onload = () => resolve();
      img.onerror = () => reject();
    });
  }

  getImage(name) {
    return this.assets.images[name];
  }
}

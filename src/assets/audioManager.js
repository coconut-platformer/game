import BaseManager from './baseManager';
import wavAssets from './audio/*.wav';
import mp3Assets from './audio/*.mp3';

export default class AudioAssetManager extends BaseManager {
  constructor() {
    super();

    this.selected = []
      .concat(Object.keys(wavAssets))
      .concat(Object.keys(mp3Assets));
    this.loaded = {};
    this.context = new AudioContext();
  }

  loadAsset(name) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.src = wavAssets[name] || mp3Assets[name];

      audio.oncanplaythrough = () => {
        this.loaded[name] = audio;
        resolve();
      };

      audio.onerror = (err) => {
        console.log('audioManager', err);
        reject();
      };
    });
  }

  resume() {
    return this.context.resume();
  }

  play(name, done = () => {}) {
    const audio = this.loaded[name].cloneNode();
    if (!audio) {
      console.log('not found', { name, audio, audioAssets }, this.loaded);
      return done();
    }
    const source = this.context.createMediaElementSource(audio);
    source.ended = () => done();
    source.connect(this.context.destination);
    audio.play();

    return source;
  }
}

export default class TweenManager {
  constructor() {
    this.tweens = [];
  }

  tween(duration, start, end, onChange, onComplete = () => {}) {
    this.tweens.push({
      duration,
      current: 0,
      start,
      end,
      onChange,
      onComplete,
    });
  }

  tick(delta) {
    for (const tween of this.tweens) {
      tween.current = Math.min(tween.current + delta, tween.duration);
      const percent = Math.min(tween.current / tween.duration, 1.0);
      const diff = tween.end - tween.start;
      const value = tween.start + diff * percent;
      tween.onChange(value);

      if (percent === 1) {
        tween.onComplete();
      }
    }
    this.tweens = this.tweens.filter(t => t.current < t.duration);
  }
}

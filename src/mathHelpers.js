import LCG from './math/prng.js';
const prng = new LCG(10);

export default {
  /**
   * Return a random integer in [min, max]
   */
  randomIntegerBetween: (min, max) => {
    return Math.round(prng.next() * (max - min) + min);
  },
};

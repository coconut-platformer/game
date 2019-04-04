/**
 * Linear congruential generator
 * https://en.wikipedia.org/wiki/Linear_congruential_generator
 * adapted from P5
 */
export default class LCG {
  constructor(seed = 1) {
    // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
    // m is basically chosen to be large (as it is the max period)
    // and for its relationships to a and c
    this.m = 4294967296;
    // a - 1 should be divisible by m's prime factors
    this.a = 1664525;
    // c and m should be co-prime
    this.c = 1013904223;
    this.seed = seed;
    this.z = seed;
  }

  setSeed(seed) {
    this.z = this.seed = (seed == null ? Math.random() * this.m : seed) >>> 0
  }

  next() {
    // define the recurrence relationship
    this.z = (this.a * this.z + this.c) % this.m;
    // return a float in [0, 1)
    // if z = m then z / m = 0 therefore (z % m) / m < 1 always
    return this.z / this.m;
  }
}

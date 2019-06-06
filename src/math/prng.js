/**
 * Linear congruential generator
 * https://en.wikipedia.org/wiki/Linear_congruential_generator
 * adapted from P5
 */
export default class LCG {
  /**
   * Setup values taken from
   * http://en.wikipedia.org/wiki/Numerical_Recipes
   *
   * Modulus is chosen to be large (as it's the max period of the PRNG)
   * as well as for its relationship to the multiplier and increment.
   *
   * (multiplier - 1) should be divisible by the modulus's prime factors.
   *
   * increment and modulus should be co-prime.
   *
   * Other options for values:
   * - Borland C/C++ uses a modulus of 2^32, a multiplier of
   *   22695477, and increment of 1.
   * - java.util.Random uses modulus 2^48, multiplier of 25214903917,
   *   and increment of 11.
   */
  constructor(seed = 1) {
    this.modulus = 4294967296;
    this.multiplier = 1664525;
    this.increment = 1013904223;
    this.seed = seed;
    this.z = seed;
  }

  setSeed(seed) {
    this.seed = (seed === null ? Math.random() * this.modulus : seed) >>> 0;
    this.z = this.seed;
  }

  /**
   * First define the recurrence relation
   *   (i.e. X_n+1 = (multiplier*X_n + increment) mod modulus)
   *   then return a float in [0, 1)
   *
   * Always less than one because:
   * if z === modulus then z % modulus = 0
   * so (z % modulus) / modulus < 1
   */
  next() {
    this.z = (this.multiplier * this.z + this.increment) % this.modulus;
    return this.z / this.modulus;
  }
}

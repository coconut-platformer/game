export default 
{
  /**
   * Return a random integer in [min, max]
   */
  randomIntegerBetween: (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  }
}
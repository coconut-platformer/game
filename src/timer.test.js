import Timer from './timer.js';

const expect = chai.expect;

describe('timer', function() {
  it('creates a timer', () => {
    const timer = new Timer();

    expect(timer.lastFrame).to.equal(null);
    expect(timer.accumulator).to.equal(0);
    expect(timer.delta).to.equal(0);
  });

  it('can add timestamps', () => {
    const timer = new Timer();

    timer.addTime(2);
    expect(timer.getDelta()).to.equal(0);
    expect(timer.accumulator).to.equal(0);

    timer.addTime(7);
    expect(timer.getDelta()).to.equal(5);
    expect(timer.accumulator).to.equal(5);
  });

  it('can drain the accumulator', () => {
    const timer = new Timer();

    timer.addTime(2);
    timer.addTime(7);

    timer.drainAccumulator(3, () => {});

    expect(timer.accumulator).to.equal(2);
  });
});

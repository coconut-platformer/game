import RenderContext from './renderContext';

const expect = chai.expect;

const makeRenderContext = (ctx = {}) => {
  const canvas = {
    getContext: () => ctx,
  };
  return new RenderContext(canvas);
};

describe('renderContext', () => {
  it('creates a renderContext', () => {
    const context = makeRenderContext({
      fillStyle: '#f0f',
      strokeStyle: '#000',
    });

    expect(context.depths).to.deep.equal([]);
    expect(context.depth).to.equal(0);
    expect(context.alpha).to.equal(1.0);
    expect(context.fill).to.equal('#f0f');
    expect(context.stroke).to.equal('#000');
    expect(context.operations).to.deep.equal([]);
  });

  describe('depths', () => {
    it('can add depths', () => {
      const context = makeRenderContext();
      context.addDepth('foo', 100);

      expect(context.depths).to.deep.equal([
        {
          name: 'foo',
          z: 100,
        },
      ]);
    });
  });

  describe('operations', () => {
    it('sets drawImage', () => {
      const context = makeRenderContext({
        fillStyle: '#f0f',
        strokeStyle: '#000',
      });
      const image = {};
      context.drawImage(image, 1, 2, 3, 4);
      expect(context.operations).to.deep.equal([
        [
          {
            type: 'drawImage',
            z: 0,
            alpha: 1.0,
            fillStyle: '#f0f',
            strokeStyle: '#000',
          },
          image,
          1,
          2,
          3,
          4,
        ],
      ]);
    });

    it('sets fillRect', () => {
      const context = makeRenderContext({
        fillStyle: '#f0f',
        strokeStyle: '#000',
      });
      context.fillRect(1, 2, 3, 4);
      expect(context.operations).to.deep.equal([
        [
          {
            type: 'fillRect',
            z: 0,
            alpha: 1.0,
            fillStyle: '#f0f',
            strokeStyle: '#000',
          },
          1,
          2,
          3,
          4,
        ],
      ]);
    });

    it('inherits depth, alpha, fill, and stroke', () => {
      const context = makeRenderContext();
      context.fillStyle = '#f0f';
      context.strokeStyle = '#000';
      context.addDepth('foo', 999).withTransparency(0.5, () => {
        context.atDepth('foo', () => {
          context.fillRect(0, 1, 2, 3);
        });
      });

      console.log(context.operations);

      expect(context.operations).to.deep.equal([
        [
          {
            type: 'fillRect',
            z: 999,
            alpha: 0.5,
            fillStyle: '#f0f',
            strokeStyle: '#000',
          },
          0,
          1,
          2,
          3,
        ],
      ]);
    });
  });
});

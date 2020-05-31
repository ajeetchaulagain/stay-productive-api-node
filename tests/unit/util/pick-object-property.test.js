import pickObjectProperty from '../../../util/pick-object-property';

describe('pickObjectProperty', () => {
  it('should pick the correct object property', () => {
    const source = {
      name: 'ajeet',
      email: 'chaulagainajeet@gmail.com',
    };
    const prop = ['name'];
    const result = pickObjectProperty(source, prop);
    expect(result).toEqual({
      name: 'ajeet',
    });
  });

  it('should throw error when  object is falsy, empty and not of object type', () => {
    const args = [null, undefined, NaN, '', 0, false, {}, 'a', 1, [1, 2]];
    const prop = ['name'];
    args.forEach((a) => {
      expect(() => {
        pickObjectProperty(a, prop);
      }).toThrow();
    });
  });

  it('should throw error when  properties is falsy and is not array type', () => {
    const args = [null, undefined, NaN, '', 0, false, 'a', 1, {}];
    const source = {
      name: 'ajeet',
      email: 'chaulagainajeet@gmail.com',
    };

    args.forEach((a) => {
      expect(() => {
        pickObjectProperty(source, a);
      }).toThrow();
    });
  });

  it('should throw error when properties array is empty', () => {
    const source = {
      name: 'ajeet',
    };
    const prop = [];
    expect(() => {
      pickObjectProperty(source, prop);
    }).toThrow();
  });
});

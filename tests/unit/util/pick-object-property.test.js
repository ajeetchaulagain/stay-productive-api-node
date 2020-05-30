import pickObjectProperty from '../../../util/pick-object-property';

describe('pickObjectProperty', () => {
  it('should pick the correct object property', () => {
    const source = {
      name: 'ajeet',
      password: 'dummy12345',
      email: 'chaulagainajeet@gmail.com',
    };
    const prop = ['name', 'password'];
    const result = pickObjectProperty(source, prop);
    expect(result).toEqual({ name: 'ajeet', password: 'dummy12345' });
  });
});

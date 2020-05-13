import sum from '../../../util/sum';

describe('test', () => {
  it('should return the correct sum', () => {
    const result = sum(4, 3);
    expect(result).toBe(7);
  });
});

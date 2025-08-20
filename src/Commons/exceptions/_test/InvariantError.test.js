const InvaraintError = require('../InvariantError');

describe('Invariant Error', () => {
  it('should create an error properly', () => {
    const invariantError = new InvaraintError('error occurs');

    expect(invariantError.statusCode).toEqual(400);
    expect(invariantError.message).toEqual('error occurs');
    expect(invariantError.name).toEqual('InvariantError');
  });
});

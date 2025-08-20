const AuthenticationError = require('../AuthenticationError');

describe('AuthenticationError', () => {
  it('should create Authentication Error', () => {
    const authenticationError = new AuthenticationError('Auth Error');

    expect(authenticationError.statusCode).toEqual(401);
    expect(authenticationError.message).toEqual('Auth Error');
    expect(authenticationError.name).toEqual('Authentication Error');
  });
});

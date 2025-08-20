const AuthUser = require('../AuthUser');

describe('AuthUser entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      accessToken: 'token',
    };

    expect(() => new AuthUser(payload).toThrowError('AUTH_USER.NOT_CONTAIN_NEEDED_PROPERTY'));
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      accessToken: 'token',
      refreshToken: 123,
    };

    expect(() => new AuthUser(payload).toThrowError('AUTH_USER.NOT_MEET_DATA_TYPE_SPECIFICATION'));
  });

  it('should create authUser object correcty', () => {
    const payload = {
      accessToken: 'accesstoken',
      refreshToken: 'refreshtoken',
    };

    const { accessToken, refreshToken } = new AuthUser(payload);

    expect(accessToken).toEqual(payload.accessToken);
    expect(refreshToken).toEqual(payload.refreshToken);
  });
});

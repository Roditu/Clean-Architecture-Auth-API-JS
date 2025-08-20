const LoginUser = require('../LoginUser');

describe('Login User entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      username: 'abc',
    };

    expect(() => new LoginUser(payload).toThrowError('LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY'));
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      username: 'abc',
      password: 123,
    };

    expect(() => new LoginUser(payload).toThrowError('LOGIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION'));
  });

  it('should create loginuser object correctly', () => {
    const payload = {
      username: 'abc',
      password: 'abc',
    };

    const { username, password } = new LoginUser(payload);

    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
  });
});

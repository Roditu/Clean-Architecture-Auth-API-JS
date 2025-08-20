const RegisteredUser = require('../RegisteredUser');

describe('a RegisterUser Entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      username: 'Dicoding',
      fullname: 'Dicoding Indonesia',
    };
    expect(() => new RegisteredUser(payload)).toThrowError('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not give correct type', () => {
    const payload = {
      id: 123,
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
    };
    expect(() => new RegisteredUser(payload)).toThrowError('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create registerUser object correctly', () => {
    const payload = {
      id: 'user-123',
      username: 'Dicoding',
      fullname: 'Dicoding Indoenesia',
    };

    const registerUser = new RegisteredUser(payload);

    expect(registerUser.id).toEqual(payload.id);
    expect(registerUser.username).toEqual(payload.username);
    expect(registerUser.fullname).toEqual(payload.fullname);
  });
});

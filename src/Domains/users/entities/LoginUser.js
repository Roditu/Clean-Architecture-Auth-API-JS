class LoginUser {
  constructor(payload) {
    const { username, password } = payload;

    this._verifyPayload(username, password);

    this.username = username;
    this.password = password;
  }

  _verifyPayload(username, password) {
    if (!username || !password) {
      throw new Error('LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
      throw new Error('LOGIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = LoginUser;

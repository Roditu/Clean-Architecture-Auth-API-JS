class AuthUser {
  constructor({ accessToken, refreshToken }) {
    this._verifyPayload(accessToken, refreshToken);

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  _verifyPayload(accessToken, refreshToken) {
    if (!accessToken || !refreshToken) {
      throw new Error('AUTH_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof accessToken !== 'string' || typeof refreshToken !== 'string') {
      throw new Error('AUTH_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AuthUser;

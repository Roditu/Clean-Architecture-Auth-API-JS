class TokenManager {
  async generateAccessToken(payload) {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  async generateRefreshToken(payload) {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  async verifyAccessToken(token) {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  async verifyRefreshToken(token) {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  async extractTokenFromHeader(header) {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  async decodeTokenToId(token) {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = TokenManager;

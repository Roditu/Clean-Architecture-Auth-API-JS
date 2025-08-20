const TokenManager = require('../TokenManager');

describe('UserRepository interface', () => {
  it('it should throw when invoke abstract behaviour', async () => {
    const tokenManager = new TokenManager();

    await expect(tokenManager.generateAccessToken()).rejects.toThrowError('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    await expect(tokenManager.generateRefreshToken()).rejects.toThrowError('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    await expect(tokenManager.verifyAccessToken()).rejects.toThrowError('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    await expect(tokenManager.verifyRefreshToken()).rejects.toThrowError('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    await expect(tokenManager.extractTokenFromHeader()).rejects.toThrowError('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    await expect(tokenManager.decodeTokenToId()).rejects.toThrowError('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  });
});

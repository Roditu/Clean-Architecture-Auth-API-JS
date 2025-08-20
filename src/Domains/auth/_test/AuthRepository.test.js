const AuthRepository = require('../AuthRepository');

describe('AuthRepository interface', () => {
  it('it should throw when invoke abstract behaviour', async () => {
    const authRepository = new AuthRepository();

    await expect(authRepository.addToken()).rejects.toThrowError('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(authRepository.checkExistingToken()).rejects.toThrowError('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(authRepository.deleteToken()).rejects.toThrowError('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});

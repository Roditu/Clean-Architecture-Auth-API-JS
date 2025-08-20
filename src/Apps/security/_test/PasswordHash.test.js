const PasswordHash = require('../PasswordHash');

describe('Password Hash Interface', () => {
  it('it should thorw error when invoke bastract behavior', async () => {
    const passwordHash = new PasswordHash();

    await expect(passwordHash.hash('dummy_pass')).rejects.toThrowError('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
    await expect(passwordHash.compare('dummy_pass')).rejects.toThrowError('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  });
});

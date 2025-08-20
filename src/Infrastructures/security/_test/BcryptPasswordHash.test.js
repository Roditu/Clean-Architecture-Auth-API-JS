const bcrypt = require('bcrypt');
const BcryptPasswordHash = require('../BcryptPasswordHash');
const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError');

describe('BcryptPasswordHash', () => {
  describe('hash function', () => {
    it('should encrypt password correctly', async () => {
      // Arrange
      const spyHash = jest.spyOn(bcrypt, 'hash');
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

      // Action
      const encryptedPassword = await bcryptPasswordHash.hash('plain_password');

      // Assert
      expect(typeof encryptedPassword).toEqual('string');
      expect(encryptedPassword).not.toEqual('plain_password');
      expect(spyHash).toBeCalledWith('plain_password', 10); // 10 adalah nilai saltRound default untuk BcryptPasswordHash
    });
  });

  describe('compare function', () => {
    it('should throw error when given wrong password', async () => {
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

      await expect(bcryptPasswordHash.compare('password', 'encryptedPassword'))
        .rejects.toThrow(AuthenticationError);
    });
    it('should compare password correctly', async () => {
      // Arrange
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

      const plainPassword = 'secret_password';
      const encryptedPassword = await bcryptPasswordHash.hash(plainPassword);

      // Action
      await expect(bcryptPasswordHash.compare(plainPassword, encryptedPassword))
        .resolves.not.toThrow(AuthenticationError);
    });
  });
});

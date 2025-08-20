const AuthRepositoryPostgres = require('../AuthRepositoryPostgres');
const AuthRepository = require('../../../Domains/auth/AuthRepository');
const pool = require('../../database/postgres/pool');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const AuthenticationTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');

describe('AuthRepositoryPostgres', () => {
  it('should be instance of AuthRepository', () => {
    const authRepository = new AuthRepositoryPostgres();
    expect(authRepository).toBeInstanceOf(AuthRepository);
  });

  afterEach(async () => {
    await AuthenticationTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addToken function', () => {
    it('should add token to database', async () => {
      const authRepository = new AuthRepositoryPostgres(pool);
      const dummyToken = 'token';

      await authRepository.addToken(dummyToken);
      const addedToken = await AuthenticationTableTestHelper.findToken(dummyToken);

      expect(addedToken).toHaveLength(1);
      expect(addedToken[0].token).toBe(dummyToken);
    });
  });

  describe('checkExistingToken function', () => {
    it('should throw error when token not exist', async () => {
      const authRepository = new AuthRepositoryPostgres(pool);

      await expect(authRepository.checkExistingToken('token'))
        .rejects.toThrow(InvariantError);
    });

    it('should throw not error when token is exist', async () => {
      const authRepository = new AuthRepositoryPostgres(pool);

      await AuthenticationTableTestHelper.addToken('token');

      await expect(authRepository.checkExistingToken('token'))
        .resolves.not.toThrow(InvariantError);
    });
  });

  describe('deleteToken function', () => {
    it('should delete token from database', async () => {
      const authRepository = new AuthRepositoryPostgres(pool);

      await AuthenticationTableTestHelper.addToken('token');

      await authRepository.deleteToken('token');

      const tokens = await AuthenticationTableTestHelper.findToken('token');
      expect(tokens).toHaveLength(0);
    });
  });
});

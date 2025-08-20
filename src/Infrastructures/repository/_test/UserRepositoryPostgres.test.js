const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const InvaraintError = require('../../../Commons/exceptions/InvariantError');
const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const pool = require('../../database/postgres/pool');
const UserRepositoryPostgres = require('../UserRepositoryPostgres');

describe('UserRepositoryPostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('verifyAvailableUsername function', () => {
    it('should throw invariant Error when username no available', async () => {
      await UsersTableTestHelper.addUser({ username: 'dicoding' });
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      await expect(userRepositoryPostgres.verifyAvailableUsername('dicoding')).rejects.toThrowError(InvaraintError);
    });

    it('should not throw invariant error when usename available', async () => {
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});
      await expect(userRepositoryPostgres.verifyAvailableUsername('dicoding')).resolves.not.toThrowError(InvaraintError);
    });
  });

  describe('addUser function', () => {
    it('should persist register user', async () => {
      const registerUser = new RegisterUser({
        username: 'dicoding',
        password: 'secret_password',
        fullname: 'Dicoding Indonesia',
      });
      const fakeIdGenerator = () => '123';
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

      await userRepositoryPostgres.addUser(registerUser);

      const users = await UsersTableTestHelper.findUsersById('user-123');
      expect(users).toHaveLength(1);
    });

    it('should return registered user correctly', async () => {
      const registerUser = new RegisterUser({
        username: 'dicoding',
        password: 'secret_password',
        fullname: 'Dicoding Indonesia',
      });
      const fakeIdGenerator = () => '123';
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

      const registeredUser = await userRepositoryPostgres.addUser(registerUser);

      expect(registeredUser).toStrictEqual(new RegisteredUser({
        id: 'user-123',
        username: 'dicoding',
        fullname: 'Dicoding Indonesia',
      }));
    });
  });

  describe('getPasswordByUsername function', () => {
    it('should throw invariant error when username not found', async () => {
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      await expect(userRepositoryPostgres.getPasswordByUsername({ username: 'dicoding' }))
        .rejects.toThrowError(InvaraintError);
    });

    it('should return password user correctly', async () => {
      await UsersTableTestHelper.addUser({ username: 'dicoding', password: 'secret_password' });

      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      const encryptedPassword = await userRepositoryPostgres.getPasswordByUsername('dicoding');
      expect(encryptedPassword).toStrictEqual('secret_password');
    });
  });

  describe('getIdByUsername', () => {
    it('should throw invariant error when username not found', async () => {
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      await expect(userRepositoryPostgres.getIdByUsername({ username: 'dicoding' }))
        .rejects.toThrowError(InvaraintError);
    });

    it('should return id user correctly', async () => {
      await UsersTableTestHelper.addUser({ username: 'dicoding', password: 'secret_password' });

      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      const userId = await userRepositoryPostgres.getIdByUsername('dicoding');
      expect(userId).toStrictEqual('user-123');
    });
  });
});

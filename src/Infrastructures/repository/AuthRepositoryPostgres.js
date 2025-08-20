const AuthRepository = require('../../Domains/auth/AuthRepository');
const InvariantError = require('../../Commons/exceptions/InvariantError');

class AuthRepositoryPostgres extends AuthRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async addToken(token) {
    const query = {
      text: 'INSERT INTO authentications VALUES ($1)',
      values: [token],
    };

    await this.pool.query(query);
  }

  async checkExistingToken(token) {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token],
    };

    const { rowCount } = await this.pool.query(query);

    if (!rowCount) {
      throw new InvariantError('refresh token tidak ditemukan di database');
    }
  }

  async deleteToken(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [token],
    };

    await this.pool.query(query);
  }
}

module.exports = AuthRepositoryPostgres;

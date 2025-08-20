const PasswordHash = require('../../Apps/security/PasswordHash');
const AuthenticationError = require('../../Commons/exceptions/AuthenticationError');

class BcryptPasswordHash extends PasswordHash {
  constructor(bcrypt, saltRound = 10) {
    super();
    this.bcrypt = bcrypt;
    this.saltRound = saltRound;
  }

  async hash(password) {
    return this.bcrypt.hash(password, this.saltRound);
  }

  async compare(plainPassword, encryptedPassword) {
    const result = await this.bcrypt.compare(plainPassword, encryptedPassword);

    if (!result) {
      throw new AuthenticationError('password yang anda masukkan salah');
    }
  }
}

module.exports = BcryptPasswordHash;

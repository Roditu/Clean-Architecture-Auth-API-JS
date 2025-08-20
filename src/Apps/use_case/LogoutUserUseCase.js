const InvariantError = require('../../Commons/exceptions/InvariantError');

class LogoutUserUseCase {
  constructor({ tokenManager, authRepository }) {
    this.tokenManager = tokenManager;
    this.authRepository = authRepository;
  }

  async execute(useCasePayload) {
    this.verifyPayload(useCasePayload);

    const { refreshToken } = useCasePayload;

    await this.authRepository.checkExistingToken(refreshToken);
    await this.tokenManager.verifyRefreshToken(refreshToken);
    await this.authRepository.deleteToken(refreshToken);
  }

  verifyPayload(useCasePayload) {
    const { refreshToken } = useCasePayload;
    if (!refreshToken) throw new InvariantError('properti refresh token tidak ditemukan');
    if (typeof refreshToken !== 'string') throw new InvariantError('tipe data refresh token salah');
  }
}

module.exports = LogoutUserUseCase;

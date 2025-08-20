const InvariantError = require('../../Commons/exceptions/InvariantError');

class RefreshAuthenticationUseCase {
  constructor({ authRepository, tokenManager }) {
    this.authRepository = authRepository;
    this.tokenManager = tokenManager;
  }

  async execute(useCasePayload) {
    this.verifyPayload(useCasePayload);

    const { refreshToken } = useCasePayload;

    await this.tokenManager.verifyRefreshToken(refreshToken);
    await this.authRepository.checkExistingToken(refreshToken);
    const { userId } = await this.tokenManager.decodeTokenToId(refreshToken);
    const accessToken = await this.tokenManager.generateAccessToken({ userId });

    return accessToken;
  }

  verifyPayload(useCasePayload) {
    const { refreshToken } = useCasePayload;
    if (!refreshToken) throw new InvariantError('properti refresh token tidak ditemukan');
    if (typeof refreshToken !== 'string') throw new InvariantError('tipe data refresh token salah');
  }
}

module.exports = RefreshAuthenticationUseCase;

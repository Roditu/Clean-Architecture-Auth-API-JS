const AuthUser = require('../../Domains/auth/entities/AuthUser');
const LoginUser = require('../../Domains/users/entities/LoginUser');

class LoginUserUseCase {
  constructor({
    userRepository, passwordHash, authRepository, tokenManager,
  }) {
    this.userRepository = userRepository;
    this.passwordHash = passwordHash;
    this.authRepository = authRepository;
    this.tokenManager = tokenManager;
  }

  async execute(useCasePayload) {
    const { username, password } = new LoginUser(useCasePayload);
    const encryptedPassword = await this.userRepository.getPasswordByUsername(username);
    await this.passwordHash.compare(password, encryptedPassword);
    const userId = await this.userRepository.getIdByUsername(username);

    const accessToken = await this.tokenManager.generateAccessToken(userId);
    const refreshToken = await this.tokenManager.generateRefreshToken(userId);

    await this.authRepository.addToken(refreshToken);

    return new AuthUser({
      accessToken,
      refreshToken,
    });
  }
}

module.exports = LoginUserUseCase;

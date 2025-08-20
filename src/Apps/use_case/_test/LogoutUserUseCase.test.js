const LogoutUserUseCase = require('../LogoutUserUseCase');
const TokenManager = require('../../security/auth/TokenManager');
const AuthRepository = require('../../../Domains/auth/AuthRepository');
const InvariantError = require('../../../Commons/exceptions/InvariantError');

describe('LogoutUserUseCase', () => {
  it('should return error when refresh token is not string', async () => {
    const useCasePayload = {
      refreshToken: 123,
    };

    const logoutUserUseCase = new LogoutUserUseCase({});

    await expect(logoutUserUseCase.execute(useCasePayload))
      .rejects.toThrow(InvariantError);
  });
  it('should return error when not given the refresh token', async () => {
    const useCasePayload = {};

    const logoutUserUseCase = new LogoutUserUseCase({});

    await expect(logoutUserUseCase.execute(useCasePayload))
      .rejects.toThrow(InvariantError);
  });
  it('should orchestrating the logout user action correctly', async () => {
    const useCasePayload = {
      refreshToken: 'refreshToken',
    };

    const mockTokenManager = new TokenManager();
    const mockAuthRepository = new AuthRepository();

    mockAuthRepository.checkExistingToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockTokenManager.verifyRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthRepository.deleteToken = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const logoutUserUseCase = new LogoutUserUseCase({
      tokenManager: mockTokenManager,
      authRepository: mockAuthRepository,
    });

    await logoutUserUseCase.execute(useCasePayload);

    expect(mockAuthRepository.checkExistingToken)
      .toBeCalledWith(useCasePayload.refreshToken);
    expect(mockTokenManager.verifyRefreshToken)
      .toBeCalledWith(useCasePayload.refreshToken);
    expect(mockAuthRepository.deleteToken)
      .toBeCalledWith(useCasePayload.refreshToken);
  });
});

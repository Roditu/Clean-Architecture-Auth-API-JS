const RefreshAuthenticationUseCase = require('../RefreshAuthenticationUseCase');
const TokenManager = require('../../security/auth/TokenManager');
const AuthRepository = require('../../../Domains/auth/AuthRepository');
const InvariantError = require('../../../Commons/exceptions/InvariantError');

describe('RefreshAuthenticationUseCase', () => {
  it('should return error when refresh token is not string', async () => {
    const useCasePayload = {
      refreshToken: 123,
    };

    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({});

    await expect(refreshAuthenticationUseCase.execute(useCasePayload))
      .rejects.toThrow(InvariantError);
  });
  it('should return error when not given the refresh token', async () => {
    const useCasePayload = {};

    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({});

    await expect(refreshAuthenticationUseCase.execute(useCasePayload))
      .rejects.toThrow(InvariantError);
  });
  it('should orchestrating the refresh authentication correctly', async () => {
    const useCasePayload = {
      refreshToken: 'refreshToken',
    };

    const mockTokenManager = new TokenManager();
    const mockAuthRepository = new AuthRepository();

    mockTokenManager.verifyRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthRepository.checkExistingToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockTokenManager.decodeTokenToId = jest.fn()
      .mockImplementation(() => Promise.resolve({ userId: 'user-123' }));
    mockTokenManager.generateAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve('access_token'));

    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({
      authRepository: mockAuthRepository,
      tokenManager: mockTokenManager,
    });

    const accessToken = await refreshAuthenticationUseCase.execute(useCasePayload);

    expect(mockTokenManager.verifyRefreshToken)
      .toBeCalledWith(useCasePayload.refreshToken);
    expect(mockAuthRepository.checkExistingToken)
      .toBeCalledWith(useCasePayload.refreshToken);
    expect(mockTokenManager.decodeTokenToId)
      .toBeCalledWith(useCasePayload.refreshToken);
    expect(mockTokenManager.generateAccessToken)
      .toBeCalledWith({ userId: 'user-123' });

    expect(accessToken).toEqual('access_token');
  });
});

const PasswordHash = require('../../security/PasswordHash');
const TokenManager = require('../../security/auth/TokenManager');

const AuthUser = require('../../../Domains/auth/entities/AuthUser');
const AuthRepository = require('../../../Domains/auth/AuthRepository');

const UserRepository = require('../../../Domains/users/UserRepository');

const LoginUserUseCase = require('../LoginUserUseCase');

describe('LoginUserUseCase', () => {
  it('should orchestrating the login user action correctly', async () => {
    const useCasePayload = {
      username: 'dicoding',
      password: 'secret',
    };

    const mockAuthUser = new AuthUser({
      accessToken: 'accesstoken',
      refreshToken: 'refreshtoken',
    });

    const mockPasswordhash = new PasswordHash();
    const mockTokenManager = new TokenManager();
    const mockAuthRepository = new AuthRepository();
    const mockUserRepository = new UserRepository();

    mockUserRepository.getPasswordByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'));
    mockPasswordhash.compare = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockUserRepository.getIdByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve('user-123'));

    mockTokenManager.generateAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAuthUser.accessToken));
    mockTokenManager.generateRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAuthUser.refreshToken));

    mockAuthRepository.addToken = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const getLoginUserUseCase = new LoginUserUseCase({
      userRepository: mockUserRepository,
      authRepository: mockAuthRepository,
      tokenManager: mockTokenManager,
      passwordHash: mockPasswordhash,
    });

    const authUser = await getLoginUserUseCase.execute(useCasePayload);

    expect(authUser).toStrictEqual(new AuthUser({
      accessToken: 'accesstoken',
      refreshToken: 'refreshtoken',
    }));

    expect(mockUserRepository.getPasswordByUsername).toBeCalledWith(useCasePayload.username);
    expect(mockUserRepository.getIdByUsername).toBeCalledWith(useCasePayload.username);
    expect(mockPasswordhash.compare).toBeCalledWith(useCasePayload.password, 'encrypted_password');

    expect(mockTokenManager.generateAccessToken).toBeCalledWith('user-123');
    expect(mockTokenManager.generateRefreshToken).toBeCalledWith('user-123');

    expect(mockAuthRepository.addToken).toBeCalledWith(mockAuthUser.refreshToken);
  });
});

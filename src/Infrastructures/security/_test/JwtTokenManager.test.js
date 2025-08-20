const Jwt = require('@hapi/jwt');
const JwtTokenManager = require('../JwtTokenManager');
const TokenManager = require('../../../Apps/security/auth/TokenManager');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError');

describe('JwtTokenManger', () => {
  it('should instance of AuthenticationTokenManager', () => {
    expect(new JwtTokenManager()).toBeInstanceOf(TokenManager);
  });

  describe('generateAccessToken', () => {
    it('should generate access token correctly', async () => {
      const payload = { userId: 'user-123' };
      const mockJwt = {
        generate: jest.fn().mockImplementation(() => 'mock_access_token'),
      };

      const jwtTokenManager = new JwtTokenManager(mockJwt);
      const token = await jwtTokenManager.generateAccessToken(payload);

      expect(mockJwt.generate).toBeCalledWith(payload, process.env.ACCESS_TOKEN_KEY);
      expect(token).toBe('mock_access_token');
    });
  });

  describe('generateRefreshToken', () => {
    it('should generate refresh token correctly', async () => {
      const payload = { userId: 'user-123' };
      const mockJwt = {
        generate: jest.fn().mockImplementation(() => 'mock_refresh_token'),
      };

      const jwtTokenManager = new JwtTokenManager(mockJwt);
      const token = await jwtTokenManager.generateRefreshToken(payload);

      expect(mockJwt.generate).toBeCalledWith(payload, process.env.REFRESH_TOKEN_KEY);
      expect(token).toBe('mock_refresh_token');
    });
  });

  describe('verifyAccessToken', () => {
    it('should throw error when token invalid', async () => {
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const invalidToken = 'invalid.token';

      await expect(jwtTokenManager.verifyAccessToken(invalidToken))
        .rejects.toThrow(InvariantError);
    });

    it('should resolve without throwing for valid token', async () => {
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const payload = { userId: 'user-123' };
      const token = await jwtTokenManager.generateAccessToken(payload);

      await expect(jwtTokenManager.verifyAccessToken(token))
        .resolves.not.toThrow();
    });
  });

  describe('verifyRefreshToken', () => {
    it('should throw error when token invalid', async () => {
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const invalidToken = 'invalid.token';

      await expect(jwtTokenManager.verifyRefreshToken(invalidToken))
        .rejects.toThrow(InvariantError);
    });

    it('should resolve without throwing for valid refresh token', async () => {
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const payload = { userId: 'user-123' };
      const token = await jwtTokenManager.generateRefreshToken(payload);

      await expect(jwtTokenManager.verifyRefreshToken(token))
        .resolves.not.toThrow();
    });
  });

  describe('extractTokenFromHeader function', () => {
    it('should return the token from header correctly', async () => {
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const header = 'Bearer token123';

      const token = await jwtTokenManager.extractTokenFromHeader(header);

      expect(token).toEqual('token123');
    });
    it('should return error when header is not provided', async () => {
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const header = '';

      await expect(jwtTokenManager.extractTokenFromHeader(header))
        .rejects.toThrow(AuthenticationError);
    });
    it('should throw error when header format is invalid', async () => {
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const header = 'TokenOnlyWithoutBearer';

      await expect(jwtTokenManager.extractTokenFromHeader(header))
        .rejects.toThrow(AuthenticationError);
    });
  });

  describe('decodeTokenToId', () => {
    it('should decode token and return userId', async () => {
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const payload = { userId: 'user-123' };
      const token = await jwtTokenManager.generateAccessToken(payload);

      const decodedPayload = await jwtTokenManager.decodeTokenToId(token);
      expect(decodedPayload.userId).toBe('user-123');
    });

    it('should throw InvariantError when token invalid', async () => {
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      await expect(jwtTokenManager.decodeTokenToId('invalid.token'))
        .rejects.toThrow(InvariantError);
    });
  });
});

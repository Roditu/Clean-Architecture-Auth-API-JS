const Jwt = require('@hapi/jwt');
const TokenManager = require('../../Apps/security/auth/TokenManager');
const InvariantError = require('../../Commons/exceptions/InvariantError');
const AuthenticationError = require('../../Commons/exceptions/AuthenticationError');

class JwtTokenManager extends TokenManager {
  constructor(jwtToken) {
    super();
    this.jwtToken = jwtToken;
  }

  async generateAccessToken(payload) {
    return this.jwtToken.generate(payload, process.env.ACCESS_TOKEN_KEY);
  }

  async generateRefreshToken(payload) {
    return this.jwtToken.generate(payload, process.env.REFRESH_TOKEN_KEY);
  }

  async verifyAccessToken(token) {
    try {
      const artifacts = this.jwtToken.decode(token);
      this.jwtToken.verifySignature(artifacts, process.env.ACCESS_TOKEN_KEY);
    } catch (error) {
      throw new InvariantError('Invalid Access Token !');
    }
  }

  async verifyRefreshToken(token) {
    try {
      const artifacts = this.jwtToken.decode(token);
      this.jwtToken.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);
    } catch (error) {
      throw new InvariantError('refresh token tidak valid');
    }
  }

  async extractTokenFromHeader(header) {
    if (!header) throw new AuthenticationError('Authorization Header Not Found !');

    const parts = header.split(' ');
    if (parts[0] !== 'Bearer' || !parts[1]) {
      throw new AuthenticationError('Invalid Authorization format');
    }

    return parts[1];
  }

  async decodeTokenToId(token) {
    try {
      const artifacts = this.jwtToken.decode(token);
      const { payload } = artifacts.decoded;
      return payload;
    } catch (error) {
      throw new InvariantError('Invalid Token !');
    }
  }
}

module.exports = JwtTokenManager;

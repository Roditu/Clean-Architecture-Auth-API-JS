const LoginUserUseCase = require('../../../../Apps/use_case/LoginUserUseCase');
const RefreshAuthenticationUseCase = require('../../../../Apps/use_case/RefreshAuthenticationUseCase');
const LogoutUserUseCase = require('../../../../Apps/use_case/LogoutUserUseCase');

class AuthenticationsHandler {
  constructor(container) {
    this.container = container;
    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, h) {
    const loginUserUseCase = this.container.getInstance(LoginUserUseCase.name);
    const { accessToken, refreshToken } = await loginUserUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async putAuthenticationHandler(request, h) {
    const refreshAuthenticationUseCase = this.container.getInstance(
      RefreshAuthenticationUseCase.name,
    );

    const accessToken = await refreshAuthenticationUseCase
      .execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        accessToken,
      },
    });
    return response;
  }

  async deleteAuthenticationHandler(request, h) {
    const logoutUserUseCase = this.container.getInstance(
      LogoutUserUseCase.name,
    );
    await logoutUserUseCase.execute(request.payload);
    const response = h.response({
      status: 'success',
      message: 'anda sudah logout',
    });
    return response;
  }
}

module.exports = AuthenticationsHandler;

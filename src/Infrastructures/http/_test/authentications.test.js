const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('authentications endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
  });

  it('should response 404 when request unregistered route', async () => {
    const server = await createServer({});

    const response = await server.inject({
      method: 'GET',
      url: '/unregisteredRoute',
    });

    expect(response.statusCode).toEqual(404);
  });

  describe('when POST /authentications', () => {
    it('should response 201 when given correct authentications', async () => {
      const requestPayload = {
        username: 'dicoding',
        password: 'secret_password',
      };

      const server = await createServer(container);

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'dicoding',
          password: 'secret_password',
          fullname: 'Dicoding Indonesia',
        },
      });

      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.accessToken).toBeDefined();
      expect(responseJson.data.refreshToken).toBeDefined();
    });
    it('should response 400 when not given needed properties', async () => {
      const requestPayload = {
        username: 'dicoding',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat login karena properti yang dibutuhkan tidak ada');
    });
    it('should response 400 when not meet data type specification', async () => {
      const requestPayload = {
        username: 'dicoding',
        password: 123,
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat login karena tipe data tidak sesuai');
    });
    it('should response 400 when username not found', async () => {
      const requestPayload = {
        username: 'wrong_username',
        password: 'secret_password',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('username tidak ditemukan');
    });
    it('should response 401 when password incorrect', async () => {
      const requestPayload = {
        username: 'dicoding',
        password: 'wrong_password',
      };

      const server = await createServer(container);

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'dicoding',
          password: 'secret_password',
          fullname: 'Dicoding Indonesia',
        },
      });

      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('password yang anda masukkan salah');
    });
  });

  describe('when PUT /authentications', () => {
    it('should response 200 when given correct authentication', async () => {
      const server = await createServer(container);

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'dicoding',
          password: 'secret_password',
          fullname: 'Dicoding Indonesia',
        },
      });

      const loginResponse = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'dicoding',
          password: 'secret_password',
        },
      });

      const { data: { refreshToken } } = JSON.parse(loginResponse.payload);

      const response = await server.inject({
        method: 'PUT',
        url: '/authentications',
        payload: { refreshToken },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.accessToken).toBeDefined();
    });

    it('should response 400 when given invalid token', async () => {
      const server = await createServer(container);

      const response = await server.inject({
        method: 'PUT',
        url: '/authentications',
        payload: { refreshToken: 'xxx' },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('refresh token tidak valid');
    });
  });

  describe('when DELETE /authentications', () => {
    it('should response 200 when given correct authentication', async () => {
      const server = await createServer(container);

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'dicoding',
          password: 'secret_password',
          fullname: 'Dicoding Indonesia',
        },
      });

      const loginResponse = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'dicoding',
          password: 'secret_password',
        },
      });

      const { data: { refreshToken } } = JSON.parse(loginResponse.payload);

      const response = await server.inject({
        method: 'DELETE',
        url: '/authentications',
        payload: { refreshToken },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
    });
    it('should response 400 when given wrong authentication', async () => {
      const server = await createServer(container);

      const response = await server.inject({
        method: 'DELETE',
        url: '/authentications',
        payload: { refreshToken: 'xxx' },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
    });
  });

  it('should handle server error correctly', async () => {
    // Arrange
    const requestPayload = {
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
      password: 'super_secret',
    };
    const server = await createServer({}); // fake container
    // Action
    const response = await server.inject({
      method: 'POST',
      url: '/authentications',
      payload: requestPayload,
    });
    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(500);
    expect(responseJson.status).toEqual('error');
    expect(responseJson.message).toEqual('terjadi kegagalan pada server kami');
  });
});

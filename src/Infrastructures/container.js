/* istanbul ignore file */
const { createContainer } = require('instances-container');

// external agent
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const jwt = require('@hapi/jwt');
const pool = require('./database/postgres/pool');

// service (repo, helper, manager, thirdPartyAccess etc)
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres');
const AuthRepositoryPostgres = require('./repository/AuthRepositoryPostgres');
const BcryptPasswordHash = require('./security/BcryptPasswordHash');
const JwtTokenManager = require('./security/JwtTokenManager');

// use case (execute, logic)
const UserRepository = require('../Domains/users/UserRepository');
const PasswordHash = require('../Apps/security/PasswordHash');
const TokenManager = require('../Apps/security/auth/TokenManager');
const AuthRepository = require('../Domains/auth/AuthRepository');
const AddUserUseCase = require('../Apps/use_case/AddUserUseCase');
const LoginUserUseCase = require('../Apps/use_case/LoginUserUseCase');
const RefreshAuthenticationUseCase = require('../Apps/use_case/RefreshAuthenticationUseCase');
const LogoutUserUseCase = require('../Apps/use_case/LogoutUserUseCase');

const container = createContainer();

container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: AuthRepository.name,
    Class: AuthRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  {
    key: TokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: jwt.token,
        },
      ],
    },
  },
]);

container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
        {
          name: 'authRepository',
          internal: AuthRepository.name,
        },
        {
          name: 'tokenManager',
          internal: TokenManager.name,
        },
      ],
    },
  },
  {
    key: RefreshAuthenticationUseCase.name,
    Class: RefreshAuthenticationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authRepository',
          internal: AuthRepository.name,
        },
        {
          name: 'tokenManager',
          internal: TokenManager.name,
        },
      ],
    },
  },
  {
    key: LogoutUserUseCase.name,
    Class: LogoutUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authRepository',
          internal: AuthRepository.name,
        },
        {
          name: 'tokenManager',
          internal: TokenManager.name,
        },
      ],
    },
  },
]);

module.exports = container;

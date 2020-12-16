import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able authenticate', async () => {
    const user = await createUser.execute({
      email: 'rodrigo@hotmail.com',
      name: 'rodrigo',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'rodrigo@hotmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    expect(
      authenticateUser.execute({
        email: 'rodrigo@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate with wrong password ', async () => {
    await createUser.execute({
      email: 'rodrigo@hotmail.com',
      name: 'rodrigo',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'rodrigo@hotmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

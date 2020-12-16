import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const User = await createUserService.execute({
      email: 'rodrigo@hotmail.com',
      name: 'rodrigo',
      password: '123456',
    });

    expect(User).toHaveProperty('id');
  });

  it('should not be able to create a new user if email already exists', async () => {
    await createUserService.execute({
      email: 'rodrigo@hotmail.com',
      name: 'rodrigo',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        email: 'rodrigo@hotmail.com',
        name: 'rodrigo',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

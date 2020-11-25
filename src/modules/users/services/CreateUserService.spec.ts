import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const createUserService = new CreateUserService(fakeUsersRepository);

    const User = await createUserService.execute({
      email: 'rodrigo@hotmail.com',
      name: 'rodrigo',
      password: '123456',
    });

    expect(User).toHaveProperty('id');
  });

  it('should not be able to create a new user if email already exists', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const createUserService = new CreateUserService(fakeUsersRepository);

    await createUserService.execute({
      email: 'rodrigo@hotmail.com',
      name: 'rodrigo',
      password: '123456',
    });

    expect(
      createUserService.execute({
        email: 'rodrigo@hotmail.com',
        name: 'rodrigo',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

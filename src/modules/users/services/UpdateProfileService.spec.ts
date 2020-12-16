import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeHahProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHahProvider: FakeHahProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHahProvider = new FakeHahProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHahProvider,
    );
  });
  it('should be able change user avatar', async () => {
    const user = await fakeUsersRepository.create({
      email: 'rodrigo@hotmail.com',
      name: 'rodrigo',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'rodrigo2',
      email: 'ro@hotmail.com',
    });

    expect(updatedUser.name).toBe('rodrigo2');
  });

  it('should not be possible to switch to an existing email ', async () => {
    await fakeUsersRepository.create({
      email: 'rodrigo1@hotmail.com',
      name: 'rodrigo',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      email: 'rodrigo2@hotmail.com',
      name: 'rodrigo',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'rodrigo2',
        email: 'rodrigo1@hotmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should  be possible to change password ', async () => {
    const user = await fakeUsersRepository.create({
      email: 'rodrigo2@hotmail.com',
      name: 'rodrigo',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'rodrigo2',
      email: 'rodrigo1@hotmail.com',
      password: 'updatePassword',
      old_password: '123456',
    });
    expect(updatedUser.password).toBe('updatePassword');
  });

  it('should  not be possible to change password without old password ', async () => {
    const user = await fakeUsersRepository.create({
      email: 'rodrigo2@hotmail.com',
      name: 'rodrigo',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'rodrigo2',
        email: 'rodrigo1@hotmail.com',
        password: 'updatePassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should  not be possible to change password with wrong old password ', async () => {
    const user = await fakeUsersRepository.create({
      email: 'rodrigo2@hotmail.com',
      name: 'rodrigo',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'rodrigo2',
        email: 'rodrigo1@hotmail.com',
        password: 'updatePassword',
        old_password: 'wrong-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

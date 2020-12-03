import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('Reset Password', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeUserTokenRepository,
    );
  });
  it('should be able to reset password ', async () => {
    const user = await fakeUsersRepository.create({
      email: 'Rodrigo@hotmail.com',
      name: 'Rodrigo',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPasswordService.execute({
      token,
      password: '654321',
    });

    const updateUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('654321');
    expect(updateUser?.password).toBe('654321');
  });

  it('should not be able to reset password  with a non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        password: '4545515',
        token: 'klfjkfjk',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password  with a non-existing user', async () => {
    const { token } = await fakeUserTokenRepository.generate(
      'no-existing-user',
    );

    await expect(
      resetPasswordService.execute({
        password: '4545515',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      email: 'Rodrigo@hotmail.com',
      name: 'Rodrigo',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: '4545515',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

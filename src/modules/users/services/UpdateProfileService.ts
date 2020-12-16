import { injectable, inject } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  user_id: string;
}
@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('IHashProvider')
    private HashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    name,
    password,
    old_password,
    user_id,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('usuario nao encontrado');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('Email already in use');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('You need to inform the old password');
    }

    if (password && old_password) {
      const checkOldPassword = await this.HashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('old password does not match');
      }

      user.password = await this.HashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

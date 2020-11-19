import { hash } from 'bcryptjs';
import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  constructor(private usersRepository: IUserRepository) {}

  async execute({ email, name, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email adress already exists.');
    }
    const hashedPassword = await hash(password, 8);
    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return user;
  }
}

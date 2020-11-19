import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../infra/typeorm/entities/User';

import authConfig from '../../../config/auth';
import AppError from '../../../shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';

interface Request {
  email: string;
  password: string;
}

interface Response {
  token: string;
  user: User;
}
export default class AuthenticateUserService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

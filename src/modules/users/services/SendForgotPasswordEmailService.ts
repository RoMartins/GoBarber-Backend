import { injectable, inject } from 'tsyringe';

// import User from '../infra/typeorm/entities/User';
// import AppError from '../../../shared/errors/AppError';

import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}
@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute({ email }: IRequest): Promise<void> {}
}

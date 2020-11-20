import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';

export default class AvatarUserController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { filename } = request.file;
    const { id } = request.user;

    const updateAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateAvatar.execute({
      avatar_fileName: filename,
      user_id: id,
    });

    //  delete user.password;
    return response.json(user);
  }
}

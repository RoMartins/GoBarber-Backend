import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateUserService from '../../../services/CreateUserService';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';

import uploadConfig from '../../../../../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (request, response) => {
  // const createUser = new CreateUserService();

  // const users = await createUser.execute();

  return response.json({ ok: true });
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  // delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const { filename } = request.file;
    const { id } = request.user;

    const updateAvatar = new UpdateUserAvatarService();

    const user = await updateAvatar.execute({
      avatar_fileName: filename,
      user_id: id,
    });

    //  delete user.password;
    return response.json(user);
  },
);

export default usersRouter;

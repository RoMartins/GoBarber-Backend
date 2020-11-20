import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import uploadConfig from '../../../../../config/upload';
import UsersControllers from '../controllers/UsersControllers';
import AvatarUserController from '../controllers/AvatarUserController';

const usersRouter = Router();
const usersControllers = new UsersControllers();
const avatarUserController = new AvatarUserController();
const upload = multer(uploadConfig);

usersRouter.get('/', async (request, response) => {
  // const createUser = new CreateUserService();

  // const users = await createUser.execute();

  return response.json({ ok: true });
});

usersRouter.post('/', usersControllers.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  avatarUserController.update,
);

export default usersRouter;

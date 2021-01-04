import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const ProvidersRouter = Router();

const providersControllers = new ProvidersController();

ProvidersRouter.use(ensureAuthenticated);

ProvidersRouter.get('/', providersControllers.index);

export default ProvidersRouter;

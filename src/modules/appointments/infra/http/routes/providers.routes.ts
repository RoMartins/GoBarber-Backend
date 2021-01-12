import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const ProvidersRouter = Router();

const providersControllers = new ProvidersController();
const providerMonthAvailabilityService = new ProviderMonthAvailabilityController();
const providerDayAvailabilityService = new ProviderDayAvailabilityController();

ProvidersRouter.use(ensureAuthenticated);

ProvidersRouter.get('/', providersControllers.index);
ProvidersRouter.post(
  '/:provider_id/month-availability',
  providerMonthAvailabilityService.index,
);

ProvidersRouter.post(
  '/:provider_id/day-availability',
  providerDayAvailabilityService.index,
);

export default ProvidersRouter;

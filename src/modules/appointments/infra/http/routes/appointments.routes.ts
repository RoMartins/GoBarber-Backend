import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointmentService = container.resolve(CreateAppointmentService);

  const appointment = await createAppointmentService.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;

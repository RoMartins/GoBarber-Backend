import { Router } from 'express';
import { parseISO } from 'date-fns';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const appointmentRepository = new AppointmentRepository();
  const parsedDate = parseISO(date);

  const createAppointmentService = new CreateAppointmentService(
    appointmentRepository,
  );

  const appointment = await createAppointmentService.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;

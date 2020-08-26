import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentsRepository';

const appointmentRepository = new AppointmentRepository();
const appointmentsRouter = Router();

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = appointmentRepository.create({
    date: parsedDate,
    provider,
  });

  return response.json(appointment);
});

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentRepository.All();

  return response.json(appointments);
});

export default appointmentsRouter;

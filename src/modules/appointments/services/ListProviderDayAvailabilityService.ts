import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
// import User from '@modules/users/infra/typeorm/entities/User';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getHours, isAfter } from 'date-fns';
// import { getDate, getDaysInMonth } from 'date-fns';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private AppointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.AppointmentsRepository.findAllInDayFromProvider(
      {
        day,
        month,
        provider_id,
        year,
      },
    );

    const startHour = 8;

    const eachHourArray = Array.from(
      { length: 10 },

      (value, index) => index + startHour,
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const currentHour = new Date(Date.now());
      const appointmentHour = new Date(year, month - 1, day, hour);
      return {
        hour,
        available:
          !hasAppointmentInHour && isAfter(appointmentHour, currentHour),
      };
    });
    return availability;
  }
}

import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
// import User from '@modules/users/infra/typeorm/entities/User';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

@injectable()
export default class ListProviderAppoinmentsService {
  constructor(
    @inject('AppointmentRepository')
    private AppointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.AppointmentsRepository.findAllInDayFromProvider(
      {
        day,
        month,
        provider_id,
        year,
      },
    );

    return appointments;
  }
}

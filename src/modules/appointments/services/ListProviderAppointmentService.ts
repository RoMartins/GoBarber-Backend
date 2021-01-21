import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
// import User from '@modules/users/infra/typeorm/entities/User';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<Appointment[]> {
    const cacheData = await this.cacheProvider.recover('key');

    console.log(cacheData);

    const appointments = await this.AppointmentsRepository.findAllInDayFromProvider(
      {
        day,
        month,
        provider_id,
        year,
      },
    );

    // await this.cacheProvider.save('key', 'valor');

    return appointments;
  }
}

import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
// import User from '@modules/users/infra/typeorm/entities/User';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
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
  }: IRequest): Promise<IResponse> {
    const appointments = await this.AppointmentsRepository.findAllInMonthFromProvider(
      {
        month,
        provider_id,
        year,
      },
    );

    console.log(appointments);
    return [{ day: 1, available: false }];
  }
}

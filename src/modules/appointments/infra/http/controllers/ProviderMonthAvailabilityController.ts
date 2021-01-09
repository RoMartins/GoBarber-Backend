import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityService {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id, month, year } = request.body;

    const listProviders = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const availabilityAppointments = await listProviders.execute({
      month,
      provider_id,
      year,
    });

    return response.json(availabilityAppointments);
  }
}

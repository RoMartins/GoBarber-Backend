import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id, month, year } = request.body;

    const listProviderMonthAvailabilityService = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const availabilityMonthAppointments = await listProviderMonthAvailabilityService.execute(
      {
        month,
        provider_id,
        year,
      },
    );

    return response.json(availabilityMonthAppointments);
  }
}

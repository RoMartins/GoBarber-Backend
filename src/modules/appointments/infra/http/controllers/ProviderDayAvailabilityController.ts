import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year, day } = request.query;

    const listProviderDayAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availabilityDayAppointments = await listProviderDayAvailabilityService.execute(
      {
        provider_id,
        month: Number(month),
        year: Number(year),
        day: Number(day),
      },
    );

    return response.json(availabilityDayAppointments);
  }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppoinmentsService from '@modules/appointments/services/ListProviderAppointmentService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.body;
    const user_id = request.user.id;

    const ProviderAppoinmentsService = container.resolve(
      ListProviderAppoinmentsService,
    );

    const appointments = await ProviderAppoinmentsService.execute({
      provider_id: user_id,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
}

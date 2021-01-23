// import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderAppoinmentsService from './ListProviderAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppoinmentsService: ListProviderAppoinmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppoinmentsService = new ListProviderAppoinmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list an appontmnets on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: '123456',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: '123456',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppoinmentsService.execute({
      day: 20,
      month: 5,
      provider_id: 'provider',
      year: 2020,
    });

    expect(appointments).toEqual(
      expect.arrayContaining([appointment1, appointment2]),
    );
  });
});

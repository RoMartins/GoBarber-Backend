import { uuid } from 'uuidv4';

class Appointment {
  provider: string;

  id: string;

  date: Date;

  constructor(provider: string, date: Date) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;

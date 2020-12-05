import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      console.log(account);

      this.client = transporter;
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Sender Name <sender@example.com>',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log('message sent : ', message.messageId);
    console.log('message sent : ', nodemailer.getTestMessageUrl(message));
  }
}

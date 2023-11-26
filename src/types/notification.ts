interface SendEmailInput {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export enum EMailProvider {
  SEND_GRID = 'SEND_GRID',
}

export interface SendMailPayload {
  provider: EMailProvider;
  data: SendEmailInput;
}

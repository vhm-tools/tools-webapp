interface SendEmailInput {
	to: string;
	subject: string;
	text: string;
	html: string;
}

export interface SendMailPayload {
	provider: EMailProvider;
	data: SendEmailInput;
}

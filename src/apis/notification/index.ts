import { HttpRequest } from '../http';
import { SendMailPayload } from '@/types';

export const sendMail = async (payload: SendMailPayload) => {
	const http = new HttpRequest();
	return http.fetch('notification/mail', {
		method: 'POST',
		body: JSON.stringify(payload),
	});
};

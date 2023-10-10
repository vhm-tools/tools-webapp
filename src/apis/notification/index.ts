import { fetchApi } from '@/apis';
import { SendMailPayload } from '@/typings';

export const sendMail = async (payload: SendMailPayload) => {
	return fetchApi('notification/mail', {
		method: 'POST',
    body: JSON.stringify(payload),
	});
};

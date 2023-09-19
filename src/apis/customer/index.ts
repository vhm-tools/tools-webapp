import { fetchApi } from '@/apis';

export const getCustomer = async () => {
  return fetchApi('customer/info', {
    method: 'GET',
  });
}

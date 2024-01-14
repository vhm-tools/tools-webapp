export const convertObjectToQuery = (obj: Record<string, any>) => {
  let str = '';

  for (const key in obj) {
    if (str !== '') {
      str += '&';
    }
    str += key + '=' + encodeURIComponent(obj[key]);
  }
  return str;
};

export const convertFirstUpperCase = (str: string) => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
};

export const removeFalsyInArray = <T = object>(arr: T[]) => {
  return arr.filter((item) => !!item);
};

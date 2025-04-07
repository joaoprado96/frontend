export const hourAndMinute = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
export const isoDateString =
  /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
export const cpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
export const cnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
export const phone = /^\(\d{2}\) \d{4,5}-\d{4}$/;
export const cep = /^\d{5}-\d{3}$/;
export const date = /^\d{2}\/\d{2}\/\d{4}$/;

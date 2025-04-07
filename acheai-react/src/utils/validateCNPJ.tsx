export const validateCNPJ = (cnpj: string): boolean => {
  if (cnpj.length !== 14) return false;

  const digits = cnpj.split('').map(Number);

  const calculateDigit = (factor: number, length: number) => {
    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += digits[i] * factor--;
      if (factor < 2) factor = 9;
    }
    return sum % 11 < 2 ? 0 : 11 - (sum % 11);
  };

  const firstDigit = calculateDigit(5, 12);
  const secondDigit = calculateDigit(6, 13);

  return digits[12] === firstDigit && digits[13] === secondDigit;
};

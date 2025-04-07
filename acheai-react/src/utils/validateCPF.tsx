export const validateCPF = (cpf: string): boolean => {
  // Remove non-digit characters
  const cleanedCpf = cpf.replace(/\D/g, '');

  // Check if the CPF has 11 digits
  if (cleanedCpf.length !== 11) return false;

  // Check if all digits are the same
  if (/^(\d)\1{10}$/.test(cleanedCpf)) return false;

  // Validate CPF digits
  const digits = cleanedCpf.split('').map(Number);
  const calculateDigit = (factor: number, length: number) => {
    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += digits[i] * factor--;
      if (factor < 2) factor = 9;
    }
    return sum % 11 < 2 ? 0 : 11 - (sum % 11);
  };

  const firstDigit = calculateDigit(10, 9);
  const secondDigit = calculateDigit(11, 10);

  return digits[9] === firstDigit && digits[10] === secondDigit;
};

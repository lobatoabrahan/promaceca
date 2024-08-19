import { Bank } from '../types/BankTypes';

export const formatBankOptions = (banks: Bank[]): { label: string; value: number }[] => {
  return banks
    .filter(bank => bank.id !== undefined) // Filtra los bancos sin ID
    .map(bank => ({
        label: bank?.bic ? `${bank.name} - ${bank.bic}` : bank.name,
        value: bank.id as number, // Asegúrate de que el valor sea un número
    }));
};

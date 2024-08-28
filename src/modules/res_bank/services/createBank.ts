import { create } from '../../global/services/create';
import { bankMapperToDatabase } from '../tools/bankMapperToDatabase';
import { Bank } from '../types/BankTypes';

export const createBank = async (bank: Omit<Bank, 'id'>): Promise<Bank | null> => {
  return create("res_bank", bank, bankMapperToDatabase);
};

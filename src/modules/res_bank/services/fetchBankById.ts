import { fetchById } from '../../global/services/fetchById';
import { bankMapperFromDatabase } from '../tools/bankMapperFromDatabase';
import { Bank } from '../types/BankTypes';

export const fetchBankById = async (id: number): Promise<Bank | null> => {
  return fetchById<Bank>(id, 'res_bank', bankMapperFromDatabase);
};
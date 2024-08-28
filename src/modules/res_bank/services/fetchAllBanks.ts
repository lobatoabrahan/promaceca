import { fetch } from '../../global/services/fetch';
import { bankMapperFromDatabase } from '../tools/bankMapperFromDatabase';
import { Bank } from '../types/BankTypes';

export const fetchAllBanks = async (): Promise<Bank[]> => {
  return await fetch<Bank>('res_bank', bankMapperFromDatabase);
};
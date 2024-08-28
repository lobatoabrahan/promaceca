import { update } from '../../global/services/update';
import { bankMapperToDatabase } from '../tools/bankMapperToDatabase';
import { Bank } from '../types/BankTypes';

export const updateBank = async (bank: Bank): Promise<Bank | null> => {
  return update<Bank>('res_bank', bank, bankMapperToDatabase);

};

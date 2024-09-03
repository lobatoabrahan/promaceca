import { update } from '../../global/services/update';
import { bankMapperFromDatabase } from '../tools/bankMapperFromDatabase';
import { Bank } from '../types/BankTypes';

export const updateBank = async (bank: Bank): Promise<Bank | null> => {
  return update<Bank>('res_bank', bank, bankMapperFromDatabase);

};

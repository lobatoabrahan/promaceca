import { supabase } from '../../../supabase/supabaseClient';
import { bankMapper } from '../tools/BankMappers';
import { Bank } from '../types/BankTypes';

export const updateBank = async (bank: Bank): Promise<Bank | null> => {
  const mappedBank = bankMapper(bank);
  
  const { id, ...bankWithoutId } = mappedBank;

  const { data, error } = await supabase
    .from('res_bank')
    .update(bankWithoutId) 
    .eq('id', id) 
    .select('*')
    .single();

  if (error) {
    console.error('Error updating bank:', error.message);
    throw new Error(`Failed to update bank: ${error.message}`);
  }

  return data as Bank;
};

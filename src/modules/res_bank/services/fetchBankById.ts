import { supabase } from '../../../supabase/supabaseClient';
import { BankTypes } from '../types/BankTypes';

export const fetchBankById = async (id: number): Promise<BankTypes | null> => {
  const { data, error } = await supabase
    .from('res_bank')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching bank by ID:', error.message);
    return null;
  }

  return data as BankTypes;
};

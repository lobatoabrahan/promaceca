import { supabase } from '../../../supabase/supabaseClient';
import { Bank } from '../types/BankTypes';

export const createBank = async (bank: Omit<Bank, 'id'>): Promise<Bank | null> => {
    
  const { data, error } = await supabase
    .from('res_bank')
    .insert([bank])
    .select('*')
    .single();

  if (error) {
    console.error('Error creating bank:', error.message);
    return null;
  }

  return data as Bank;
};

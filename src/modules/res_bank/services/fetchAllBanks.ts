import { supabase } from '../../../supabase/supabaseClient';
import { Bank } from '../types/BankTypes';

export const fetchAllBanks = async (): Promise<Bank[]> => {
  const { data, error } = await supabase
    .from('res_bank')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw new Error(error.message);

  return data as Bank[];
};

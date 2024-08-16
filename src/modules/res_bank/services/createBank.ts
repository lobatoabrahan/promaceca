import { Bank } from '../types/BankTypes';
/* import { supabase } from '../supabaseClient'; // Asegúrate de que el path al cliente Supabase es correcto
 */
export const createBank = async (bank: Omit<Bank, 'id'>): Promise<Bank | null> => {
    console.log("createBank",bank)
  /* const { data, error } = await supabase
    .from('res_bank')
    .insert([bank])
    .select('*')
    .single();

  if (error) {
    console.error('Error creating bank:', error.message);
    return null;
  } */

  return bank as Bank;
};

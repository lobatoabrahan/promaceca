import { BankTypes } from '../types/BankTypes';
/* import { supabase } from '../supabaseClient'; // Asegúrate de que el path al cliente Supabase es correcto
 */
export const createBank = async (bank: Omit<BankTypes, 'id'>): Promise<BankTypes | null> => {
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

  return bank as BankTypes;
};

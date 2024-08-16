import { BankTypes } from '../types/BankTypes';
/* import { supabase } from '../supabaseClient'; // Asegúrate de que el path al cliente Supabase es correcto
 */
export const updateBank = async (bank: BankTypes): Promise<BankTypes | null> => {
    console.log("updateBank",bank)
  /* const { data, error } = await supabase
    .from('res_bank')
    .update(bank)
    .eq('id', bank.id)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating bank:', error.message);
    return null;
  } */

  return bank as BankTypes;
};

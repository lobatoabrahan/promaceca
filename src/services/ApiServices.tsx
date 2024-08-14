import axios from 'axios';
import { Partner } from '../types';
import { supabase } from '../supabase/supabaseClient';
import { Bank } from '../types';

const api = axios.create({
  baseURL: '/api', // Cambia a la URL base de tu API
});

export const fetchTransaccionesInventario = async () => {
  try {
    const response = await api.get('/inventario/transacciones');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las transacciones de inventario:', error);
    throw error;
  }
};

export const get_res_partner = async (): Promise<{
  data: Partner[] | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from<Partner>('res_partner')
      .select('*');
    if (error) {
      throw new Error(error.message);
    }
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

export const postTransaccionInventario = async (data: object) => {
  try {
    const response = await api.post('/inventario/transacciones', data);
    return response.data;
  } catch (error) {
    console.error('Error al enviar la transacción de inventario:', error);
    throw error;
  }
};

export const fetchBank = async (id: number): Promise<Bank | null> => {
  const { data, error } = await supabase
    .from<Bank>('res_bank')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    console.error('Error fetching bank:', error);
    return null;
  }
  return data;
};

export const fetchAllBanks = async (): Promise<Bank[] | null> => {
  const { data, error } = await supabase.from<Bank>('res_bank').select('*');
  if (error) {
    console.error('Error fetching banks:', error);
    return null;
  }

  // Ordenar los bancos por nombre ignorando mayúsculas y minúsculas
  const sortedData = data.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  );

  return sortedData;
};

// src/services/ApiServices.tsx
export const saveBank = async (
  bank: Partial<Bank>,
  isEdit: boolean
): Promise<number | null> => {
  let error;
  const { id, ...bankData } = bank;
  let newBankId: number | null = null;

  try {
    if (isEdit && id) {
      // Actualizar banco existente
      ({ error } = await supabase
        .from<Bank>('res_bank')
        .update(bankData)
        .eq('id', id));
    } else {
      // Crear nuevo banco
      const { data, error: insertError } = await supabase
        .from<Bank>('res_bank')
        .upsert([bankData], { returning: 'representation' }) // Ensure returning the full representation
        .select();

      if (data && data.length > 0) {
        newBankId = data[0].id; // Get the ID from the returned data
      }
      error = insertError;
    }

    if (error) {
      throw error; // Propagate error to catch block
    }
  } catch (err) {
    console.error('Error saving bank:', err);
  }

  return newBankId; // Return the new bank ID or null
};


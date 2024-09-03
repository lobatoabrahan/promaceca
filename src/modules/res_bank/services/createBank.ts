import { create } from '../../global/services/create';
import { bankMapperFromDatabase } from '../tools/bankMapperFromDatabase';
import { bankMapperToDatabase } from '../tools/bankMapperToDatabase';
import { Bank, BankToDatabase } from '../types/BankTypes';

/**
 * Crea un nuevo banco en la base de datos.
 * 
 * @param bank - Datos del banco a crear.
 * @returns - El banco creado con su ID asignado por la base de datos.
 */
export const createBank = async (bank: BankToDatabase): Promise<Bank> => {
  return create<Bank, BankToDatabase>("res_bank", bank, bankMapperToDatabase, bankMapperFromDatabase);
};

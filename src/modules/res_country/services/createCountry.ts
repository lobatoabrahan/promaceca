import { create } from '../../global/services/create';
import { countryMapperFromDatabase, countryMapperToDatabase } from '../tools/countryMapper';
import { Country, CountryToDatabase } from '../types/CountryTypes';

/**
 * Crea un nuevo pais en la base de datos.
 * 
 * @param country - Datos del pais a crear.
 * @returns - El pais creado con su ID asignado por la base de datos.
 */
export const createCountry = async (country: CountryToDatabase): Promise<Country> => {
  return create<Country, CountryToDatabase>("res_country", country, countryMapperToDatabase, countryMapperFromDatabase);
};

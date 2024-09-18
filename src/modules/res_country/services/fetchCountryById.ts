import { fetchById } from '../../global/services/fetchById';
import { countryMapperFromDatabase } from '../tools/countryMapper';
import { Country } from '../types/CountryTypes';

export const fetchCountryById = async (id: number): Promise<Country | null> => {
  return fetchById<Country>(id, 'res_country', countryMapperFromDatabase);
};
import { fetch } from '../../global/services/fetch';
import { countryMapperFromDatabase } from '../tools/countryMapper';
import { Country } from '../types/CountryTypes';

export const fetchAllCountrys = async (): Promise<Country[]> => {
  return await fetch<Country>('res_country', countryMapperFromDatabase);
};
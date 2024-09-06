import { update } from '../../global/services/update';
import { countryMapperFromDatabase } from '../tools/countryMapperFromDatabase';
import { Country } from '../types/CountryTypes';

export const updateCountry = async (country: Country): Promise<Country | null> => {
  return update<Country>('res_country', country, countryMapperFromDatabase);

};

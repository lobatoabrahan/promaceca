import { create } from '../../global/services/create';
import { countryMapperFromDatabase, countryMapperToDatabase } from '../tools/countryMapper';
import { Country, CountryToDatabase } from '../types/CountryTypes';
import { update } from '../../global/services/update';

export const createCountry = async (country: CountryToDatabase): Promise<Country> => {
  return create<Country, CountryToDatabase>("res_country", country, countryMapperToDatabase, countryMapperFromDatabase);
};


export const updateCountry = async (country: Country): Promise<Country | null> => {
  return update<Country>('res_country', country, countryMapperFromDatabase);

};

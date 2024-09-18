import { create } from '../../global/services/create';
import { update } from '../../global/services/update';
import { countryStatesMapperFromDatabase, countryStatesMapperToDatabase } from '../tools/countryStatesMapper';
import { CountryStates, CountryStatesToDatabase } from '../types/CountryTypes';

export const createCountryState = async (state: CountryStatesToDatabase): Promise<CountryStates> => {
  return create<CountryStates, CountryStatesToDatabase>("res_country_state", state, countryStatesMapperToDatabase, countryStatesMapperFromDatabase);
};


export const updateCountryState = async (state: CountryStates): Promise<CountryStates | null> => {
  return update<CountryStates>('res_country_state', state, countryStatesMapperFromDatabase);

};

import { useRealtimeDataById } from '../../global/hooks/useRealtimeDataById';
import { fetchCountryById } from '../services/fetchCountryById';
import { Country } from '../types/CountryTypes';

export const useCountryRealtimeById = (id: number | null) => {

  const { data:country, isLoading:countryIsLoading, isError:countryIsError, error:countryError, hasUpdates:countryHasUpdates } = useRealtimeDataById<Country>({
    id,
    queryKey: ['country'],
    queryFn: fetchCountryById,
    channelName: 'res_country',
  });
  return { country, countryIsLoading, countryIsError, countryError, countryHasUpdates };
}
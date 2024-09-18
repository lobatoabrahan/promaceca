import { useRealtimeData } from '../../global/hooks/useRealtimeData';
import { fetch } from '../../global/services/fetch';
import { countryMapperFromDatabase } from '../tools/countryMapper';
import { Country } from '../types/CountryTypes';
import { useRealtimeDataById } from '../../global/hooks/useRealtimeDataById';
import { fetchById } from '../../global/services/fetchById';

export const useCountryRealtime = () => {
  const fetchAllCountrys = async (): Promise<Country[]> => {
    return await fetch<Country>('res_country', countryMapperFromDatabase);
  };
  const { data: countrys, isLoading: countrysIsLoading, isError: countrysIsError, error: countrysError, hasUpdates: countrysHasUpdates } = useRealtimeData<Country>({
    queryKey: ['countrys'],
    queryFn: fetchAllCountrys,
    channelName: 'res_country',
  });

  return { countrys, countrysIsLoading, countrysIsError, countrysError, countrysHasUpdates };
};



export const useCountryRealtimeById = (id: number | null) => {
  const fetchCountryById = async (id: number): Promise<Country | null> => {
    return fetchById<Country>(id, 'res_country', countryMapperFromDatabase);
  };

  const { data: country, isLoading: countryIsLoading, isError: countryIsError, error: countryError, hasUpdates: countryHasUpdates } = useRealtimeDataById<Country>({
    id,
    queryKey: ['country'],
    queryFn: fetchCountryById,
    channelName: 'res_country',
  });
  return { country, countryIsLoading, countryIsError, countryError, countryHasUpdates };
}
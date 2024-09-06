import { useRealtimeData } from '../../global/hooks/useRealtimeData';
import { fetchAllCountrys } from '../services/fetchAllCountrys';
import { Country } from '../types/CountryTypes';

export const useCountryRealtime = () => {
  const { data: countrys, isLoading: countrysIsLoading, isError:countrysIsError, error:countrysError, hasUpdates:countrysHasUpdates } = useRealtimeData<Country>({
    queryKey: ['countrys'],
    queryFn: fetchAllCountrys,
    channelName: 'res_country',
  });

  return { countrys, countrysIsLoading, countrysIsError, countrysError, countrysHasUpdates };
};

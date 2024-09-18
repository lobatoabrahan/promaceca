import { useRealtimeData } from "../../global/hooks/useRealtimeData";
import { useRealtimeDataById } from "../../global/hooks/useRealtimeDataById";
import { fetch } from "../../global/services/fetch";
import { fetchById } from "../../global/services/fetchById";
import { countryStatesMapperFromDatabase } from "../tools/countryStatesMapper";
import { CountryStates } from "../types/CountryTypes";

export const useCountryStateRealtime = () => {
  const fetchAllCountrysStates = async (): Promise<CountryStates[]> => {
    return await fetch<CountryStates>('res_country_state', countryStatesMapperFromDatabase);
  };
  const { data: countrysStates, isLoading: countrysStatesIsLoading, isError: countryStatessIsError, error: countryStatessError, hasUpdates: countrysStatesHasUpdates } = useRealtimeData<CountryStates>({
    queryKey: ['countrysStates'],
    queryFn: fetchAllCountrysStates,
    channelName: 'res_country_state',
  });

  return { countrysStates, countrysStatesIsLoading, countryStatessIsError, countryStatessError, countrysStatesHasUpdates };
};



export const useCountryStateRealtimeById = (id: number | null) => {
  const fetchCountryById = async (id: number): Promise<CountryStates | null> => {
    return fetchById<CountryStates>(id, 'res_country_state', countryStatesMapperFromDatabase);
  };

  const { data: countryState, isLoading: countryStateIsLoading, isError: countryStateIsError, error: countryStateError, hasUpdates: countryStateHasUpdates } = useRealtimeDataById<CountryStates>({
    id,
    queryKey: ['countryState'],
    queryFn: fetchCountryById,
    channelName: 'res_country_state',
  });
  return { countryState, countryStateIsLoading, countryStateIsError, countryStateError, countryStateHasUpdates };
}
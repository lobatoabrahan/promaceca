import { useSelect } from '../../global/hooks/useSelect';
import { createCountryState } from '../services/countryStatesServices';
import { formatCountryStateOptions } from '../tools/formatCountryStateOptions';
import { useCountryStateRealtime } from './useCountryStateRealtime';

export const useCountryStateSelect = () => {
  const { countrysStates, countrysStatesHasUpdates } = useCountryStateRealtime();

  return useSelect({
    data: countrysStates,
    hasUpdates: countrysStatesHasUpdates,
    formatOptions: formatCountryStateOptions,
    createEntity: createCountryState,
  });
};
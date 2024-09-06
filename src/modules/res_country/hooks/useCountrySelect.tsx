import { useSelect } from '../../global/hooks/useSelect';
import { createCountry } from '../services/createCountry';
import { formatCountryOptions } from '../tools/formatCountryOptions';
import { useCountryRealtime } from './useCountryRealtime';

export const useCountrySelect = () => {
  const { countrys, countrysHasUpdates } = useCountryRealtime();

  return useSelect({
    data: countrys,
    hasUpdates: countrysHasUpdates,
    formatOptions: formatCountryOptions,
    createEntity: createCountry,
  });
};
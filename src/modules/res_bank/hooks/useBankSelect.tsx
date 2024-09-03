import { useSelect } from '../../global/hooks/useSelect';
import { useBankRealtime } from './useBankRealtime';
import { formatBankOptions } from '../tools/formatBankOptions';
import { createBank } from '../services/createBank';

export const useBankSelect = () => {
  const { banks, banksHasUpdates } = useBankRealtime();

  return useSelect({
    data: banks,
    hasUpdates: banksHasUpdates,
    formatOptions: formatBankOptions,
    createEntity: createBank,
  });
};
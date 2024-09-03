import { Bank } from '../types/BankTypes';
import { fetchAllBanks } from '../services/fetchAllBanks';
import { useRealtimeData } from '../../global/hooks/useRealtimeData';

export const useBankRealtime = () => {
  const { data: banks, isLoading: banksIsLoading, isError:banksIsError, error:banksError, hasUpdates:banksHasUpdates } = useRealtimeData<Bank>({
    queryKey: ['banks'],
    queryFn: fetchAllBanks,
    channelName: 'res_bank',
  });

  return { banks, banksIsLoading, banksIsError, banksError, banksHasUpdates };
};

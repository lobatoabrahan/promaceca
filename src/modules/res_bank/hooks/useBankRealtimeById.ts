import { Bank } from '../types/BankTypes';
import { fetchBankById } from '../services/fetchBankById';
import { useRealtimeDataById } from '../../global/hooks/useRealtimeDataById';

export const useBankRealtimeById = (id: number | null) => {

  const { data:bank, isLoading:bankIsLoading, isError:bankIsError, error:bankError, hasUpdates:bankHasUpdates } = useRealtimeDataById<Bank>({
    id,
    queryKey: ['bank'],
    queryFn: fetchBankById,
    channelName: 'res_bank',
  });
  return { bank, bankIsLoading, bankIsError, bankError, bankHasUpdates };
}
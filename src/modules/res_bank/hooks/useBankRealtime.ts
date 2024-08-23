import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Bank } from '../types/BankTypes';
import { fetchAllBanks } from '../services/fetchAllBanks';
import subscribeToSupabaseChannel from '../../global/services/subscribeToSupabaseChannel';
import { RealTimePayLoadTypes } from '../../global/types/realtimePayload';

export const useBankRealtime = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [hasUpdates, setHasUpdates] = useState<boolean>(false);

  const { data, isLoading, isError, error } = useQuery<Bank[], Error>({
    queryKey: ['banks'],
    queryFn: fetchAllBanks,
    
  });

  useEffect(() => {
    if (data) {
      setBanks(data);
    }
  }, [data]);
  
  useEffect(() => {
    // Manejo de actualizaciones en tiempo real
    const handleRealtimeUpdate = (payload: RealTimePayLoadTypes<Bank>) => {
      setHasUpdates(true);

      switch (payload.eventType) {
        case 'INSERT':
          setBanks(prev => [...prev, payload.new]);
          break;
        case 'UPDATE':
          setBanks(prev => prev.map(bank => bank.id === payload.new.id ? payload.new : bank));
          break;
        case 'DELETE':
          setBanks(prev => prev.filter(bank => bank.id !== payload.old?.id));
          break;
        default:
          break;
      }
    };

    const channel = subscribeToSupabaseChannel(handleRealtimeUpdate, "res_bank");

    return () => {
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (hasUpdates) {
      // Opcional: Implementar lógica adicional para manejar actualizaciones
      setHasUpdates(false);
    }
  }, [hasUpdates]);

  return { banks, isLoading, isError, error, hasUpdates };
};

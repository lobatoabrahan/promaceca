// hooks/useBankWithRealtime.ts

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Bank } from '../types/BankTypes';
import { fetchBankById } from '../services/fetchBankById';
import subscribeToSupabaseChannel from '../../global/services/subscribeToSupabaseChannel';
import { RealTimePayLoadTypes } from '../../global/types/realtimePayload';

export const useBankRealtimeById = (id: number | null) => {
  const [bank, setBank] = useState<Bank | null>(null);
  const [hasUpdates, setHasUpdates] = useState<boolean>(false);

  const { data, isLoading, isError, error } = useQuery<Bank | null, Error>({
    queryKey: ['bank', id],
    queryFn: () => fetchBankById(id!),
    enabled: !!id, // Solo realiza la consulta si id está definido
  });

  useEffect(() => {
    if (data) {
      setBank(data);
    }
  }, [data]);

  useEffect(() => {
    if (id === null) return;

    const handleRealtimeUpdate = (payload: RealTimePayLoadTypes<Bank>) => {
      setHasUpdates(true); // Marca que hubo una actualización

      switch (payload.eventType) {
        case 'INSERT':
        case 'UPDATE':
          if (payload.new.id === id) {
            setBank(payload.new);
          }
          break;
        case 'DELETE':
          if (payload.old?.id === id) {
            setBank(null); // El banco fue eliminado
          }
          break;
        default:
          break;
      }
    };

    const channel = subscribeToSupabaseChannel(handleRealtimeUpdate, "res_bank", id);

    return () => {
      channel.unsubscribe();
    };
  }, [id]);

  // Opcional: Resetear el estado de `hasUpdates` después de un tiempo
  useEffect(() => {
    const resetUpdates = () => setHasUpdates(false);
    if (hasUpdates) {
      const timer = setTimeout(resetUpdates, 300); // Por ejemplo, después de 3 segundos
      return () => clearTimeout(timer);
    }
  }, [hasUpdates]);

  return { bank, isLoading, isError, error, hasUpdates };
};

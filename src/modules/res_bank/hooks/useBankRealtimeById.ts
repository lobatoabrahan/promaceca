// hooks/useRealtimeBankById.ts

import { useEffect, useState } from 'react';
import { Bank } from '../types/BankTypes';
import { subscribeToBankChanges } from '../services/subscribeToBankChanges';

export const useRealtimeBankById = (id: number | null) => {
  const [bank, setBank] = useState<Bank | null>(null);
  const [hasUpdates, setHasUpdates] = useState<boolean>(false);

  useEffect(() => {
    if (id === null) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRealtimeUpdate = (payload: any) => {
      setHasUpdates(true); // Marca que hubo una actualización

      switch (payload.eventType) {
        case 'INSERT':
          if (payload.new.id === id) {
            setBank(payload.new);
          }
          break;
        case 'UPDATE':
          if (payload.new.id === id) {
            setBank(payload.new);
          }
          break;
        case 'DELETE':
          if (payload.old.id === id) {
            setBank(null); // El banco fue eliminado
          }
          break;
        default:
          break;
      }
    };

    const channel = subscribeToBankChanges(handleRealtimeUpdate,id);

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

  return { bank, hasUpdates };
};

// hooks/useRealtimeBank.ts

import { useEffect, useState } from 'react';
import { Bank } from '../types/BankTypes';
import { subscribeToBankChanges } from '../services/subscribeToBankChanges';

export const useRealtimeBank = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [hasUpdates, setHasUpdates] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRealtimeUpdate = (payload: any) => {
      setHasUpdates(true);  // Marca que hubo una actualización

      switch (payload.eventType) {
        case 'INSERT':
          setBanks(prev => [...prev, payload.new]);
          break;
        case 'UPDATE':
          setBanks(prev => prev.map(bank => bank.id === payload.new.id ? payload.new : bank));
          break;
        case 'DELETE':
          setBanks(prev => prev.filter(bank => bank.id !== payload.old.id));
          break;
        default:
          break;
      }
    };

    const channel = subscribeToBankChanges(handleRealtimeUpdate);

    return () => {
      channel.unsubscribe();
    };
  }, []);

  // Opcional: Puedes incluir un efecto para resetear el estado de `hasUpdates` después de un tiempo
  useEffect(() => {
    const resetUpdates = () => setHasUpdates(false);
    if (hasUpdates) {
      const timer = setTimeout(resetUpdates, 300); // Por ejemplo, después de 3 segundos
      return () => clearTimeout(timer);
    }
  }, [hasUpdates]);

  return { banks, hasUpdates };
};

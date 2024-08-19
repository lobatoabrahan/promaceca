import { useEffect, useState } from 'react';
import { Bank } from '../types/BankTypes';
import { subscribeToBankChanges } from '../services/subscribeToBankChanges';
import { fetchAllBanks } from '../services/fetchAllBanks';

export const useRealtimeBank = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [hasUpdates, setHasUpdates] = useState<boolean>(false);

  useEffect(() => {
    const loadBanks = async () => {
      try {
        const initialBanks = await fetchAllBanks();

        // Verifica que initialBanks no sea undefined o null
        if (!initialBanks) {
          throw new Error('No banks data received');
        }

        setBanks(initialBanks);
      } catch (err) {
        console.error('Failed to load initial banks:', err);
      }
    };

    loadBanks();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRealtimeUpdate = (payload: any) => {
      setHasUpdates(true);

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

  useEffect(() => {
    if (hasUpdates) {
      // Puedes implementar lógica adicional para manejar actualizaciones, si es necesario
      setHasUpdates(false);
    }
  }, [hasUpdates]);

  return { banks, hasUpdates };
};

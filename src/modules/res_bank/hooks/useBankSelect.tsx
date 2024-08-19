import { useState, useEffect } from 'react';
import { fetchAllBanks } from '../services/fetchAllBanks';
import { formatBankOptions } from '../tools/formatBankOptions';
import { useRealtimeBank } from './useBankRealtime';

export const useBankSelect = () => {
  const [banks, setBanks] = useState<{ label: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>('');


  const { banks: realtimeBanks, hasUpdates } = useRealtimeBank();

  useEffect(() => {
    const loadBanks = async () => {
      try {
        const initialBanks = await fetchAllBanks();

        // Verifica que initialBanks no sea undefined o null
        if (!initialBanks) {
          throw new Error('No banks data received');
        }

        // Verifica que initialBanks sea un array y tenga elementos
        if (!Array.isArray(initialBanks) || initialBanks.length === 0) {
          setBanks([]); // Establece un array vacío si no hay datos
        } else {
          setBanks(formatBankOptions(initialBanks));
        }
      } catch (err) {
        console.error(err); // Imprime el error en la consola para depuración
        setError('Failed to load banks');
      } finally {
        setLoading(false);
      }
    };

    loadBanks();

  }, []);

  useEffect(() => {
    if (hasUpdates) {
      // Combina los datos en tiempo real con los datos existentes
      setBanks(prevBanks => {
        const updatedBanks = formatBankOptions(realtimeBanks);
        // Utiliza un mapa para combinar bancos por ID
        const banksMap = new Map<number, { label: string; value: number }>(
          prevBanks.map(bank => [bank.value, bank])
        );
        updatedBanks.forEach(bank => banksMap.set(bank.value, bank));
        return Array.from(banksMap.values());
      });
    }
  }, [realtimeBanks, hasUpdates]);

  // Función para crear un nuevo banco
  const onCreate = async () => {
    console.log('Create button clicked. Search text:', searchText);
  };

  // Función para crear un nuevo banco y abrir el modal de edición
  const onCreateAndEdit = async () => {
    console.log('Create and Edit button clicked. Search text:', searchText);
  };

  return { banks, loading, error, onCreate, onCreateAndEdit, searchText, setSearchText };
};

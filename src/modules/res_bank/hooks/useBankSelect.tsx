import { useState, useEffect } from 'react';
import { formatBankOptions } from '../tools/formatBankOptions';
import { createBank } from '../services/createBank';
import { useRealtimeBank } from './useBankRealtime';

export const useBankSelect = () => {
  const [options, setOptions] = useState<{ label: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  const { banks, hasUpdates } = useRealtimeBank();

  useEffect(() => {
    // Update options when banks data is available or updated
    if (banks.length > 0) {
      setOptions(formatBankOptions(banks));
      setLoading(false);
    } else {
      setLoading(false);
      setOptions([]);
    }
  }, [banks]);

  useEffect(() => {
    if (hasUpdates) {
      // If real-time updates are detected, refresh the options
      setOptions(formatBankOptions(banks));
    }
  }, [hasUpdates, banks]);

  // Function to create a new bank
  const onCreate = async () => {
    if (searchText.trim() === '') {
      throw new Error('El texto de búsqueda está vacío.');
    }

    try {
      const newBank = await createBank({ name: searchText });

      if (newBank && newBank.id) {
        return newBank.id; // Return the new bank's ID
      } else {
        throw new Error('Fallo al crear.');
      }
    } catch (error) {
      console.error(error);
      setError('Fallo al crear.');
      throw error;
    }
  };

  // Function to create a new bank and open the edit modal
  const onCreateAndEdit = async () => {
    if (searchText.trim() === '') {
      throw new Error('El texto de búsqueda está vacío.');
    }

    try {
      const newBank = await createBank({ name: searchText });

      if (newBank && newBank.id) {
        return newBank.id; // Return the new bank's ID
      } else {
        throw new Error('Fallo al crear.');
      }
    } catch (error) {
      console.error(error);
      setError('Fallo al crear.');
      throw error;
    }
  };

  return {
    options,
    loading,
    error,
    onCreate,
    onCreateAndEdit,
    searchText,
    setSearchText,
  };
};

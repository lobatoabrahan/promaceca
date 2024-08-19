import { useState, useEffect } from 'react';
import { fetchAllBanks } from '../services/fetchAllBanks';
import { formatBankOptions } from '../tools/formatBankOptions';
import { useRealtimeBank } from './useBankRealtime';
/* import { createBank } from '../services/createBank';
 */
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
    try {
      if (searchText.trim() === '') {
        throw new Error('Search text is empty. Cannot create a bank without a name.');
      }
  
      // Simula una llamada a la API con un retraso de 3 segundos
      await new Promise((resolve) => setTimeout(resolve, 3000));
  
      // Llama a la función para crear un nuevo banco en la base de datos
      const newBank = 1; /* await createBank({ name: searchText }); */
  
      // Verifica si la creación fue exitosa
      if (newBank === 1 /* && newBank.id */) {
        return 1; // Devuelve el ID simulado del nuevo banco
      } else {
        throw new Error("Failed to create a new bank.");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create a new bank.");
    }
  };
  

  // Función para crear un nuevo banco y abrir el modal de edición
  const onCreateAndEdit = async () => {
    console.log('Create and Edit button clicked. Search text:', searchText);
  };

  return { banks, loading, error, onCreate, onCreateAndEdit, searchText, setSearchText };
};

import { Bank } from '../../types';
import { useGenericApi } from '../../hooks/useApi'; // Ajusta la ruta según tu estructura

export const useBankApi = ( id : number | null) => {
  const { data, items, loading, error, isUpdating, refetchItems } = useGenericApi<Bank>(
    'res_bank', // Usa el nombre correcto de la tabla
    id
  );

  return { data, items, loading, error, isUpdating, refetchItems };
};

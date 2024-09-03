import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import subscribeToSupabaseChannel from '../../global/services/subscribeToSupabaseChannel';
import { RealTimePayLoadTypes } from '../../global/types/realtimePayload';

interface Identifiable {
    id: number;
}


type UseRealtimeDataByIdProps<T extends Identifiable> = {
  id: number | null;
  queryKey: string[];
  queryFn: (id: number) => Promise<T | null>;
  channelName: string;
};

export const useRealtimeDataById = <T extends Identifiable>({
  id,
  queryKey,
  queryFn,
  channelName,
}: UseRealtimeDataByIdProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [hasUpdates, setHasUpdates] = useState<boolean>(false);

  const { data: fetchedData, isLoading, isError, error } = useQuery<T | null, Error>({
    queryKey: [...queryKey, id],
    queryFn: () => queryFn(id!),
    enabled: !!id, // Solo realiza la consulta si id está definido
  });

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);

  useEffect(() => {
    if (id === null) return;

    const handleRealtimeUpdate = (payload: RealTimePayLoadTypes<T>) => {
      setHasUpdates(true); // Marca que hubo una actualización

      switch (payload.eventType) {
        case 'INSERT':
        case 'UPDATE':
          if (payload.new.id === id) {
            setData(payload.new);
          }
          break;
        case 'DELETE':
          if (payload.old?.id === id) {
            setData(null); // La entidad fue eliminada
          }
          break;
        default:
          break;
      }
    };

    const channel = subscribeToSupabaseChannel(handleRealtimeUpdate, channelName, id);

    return () => {
      channel.unsubscribe();
    };
  }, [id, channelName]);

  useEffect(() => {
    if (hasUpdates) {
      setHasUpdates(false);
    }
  }, [hasUpdates]);

  return { data, isLoading, isError, error, hasUpdates };
};

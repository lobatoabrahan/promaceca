import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase/supabaseClient';

// Define a type for the payload structure if needed
type Payload<T> = {
  eventType: string;
  old: T;
  new: T;
};

export const useGenericApi = <T extends { id: number; name?: string }>(
  tableName: string,
  id: number | null = null
) => {
  const [data, setData] = useState<T | null>(null);
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (id) {
          const { data: itemData, error: itemError } = await supabase
            .from<T>(tableName)
            .select('*')
            .eq('id', id)
            .single();

          if (itemError) throw itemError;
          setData(itemData);
        } else {
          const { data: allItems, error: itemsError } = await supabase
            .from<T>(tableName)
            .select('*');

          if (itemsError) throw itemsError;

          const sortedItems = (allItems || []).sort((a, b) =>
            (a.name || '').localeCompare(b.name || '', undefined, { sensitivity: 'base' })
          );
          setItems(sortedItems);
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const channel = supabase
      .channel(`custom-${tableName}-channel`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: tableName },
        (payload) => handleRealtimeUpdate(payload)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, tableName]);

  useEffect(() => {
    if (id) {
      const specificItemChannel = supabase
        .channel(`custom-${tableName}-specific-channel-${id}`)
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: tableName, filter: `id=eq.${id}` },
          (payload) => handleRealtimeItemUpdate(payload)
        )
        .subscribe();

      return () => {
        supabase.removeChannel(specificItemChannel);
      };
    }
  }, [id, tableName]);

  const handleRealtimeUpdate = (payload: Payload<T>) => {
    if (payload.eventType === 'DELETE') {
      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== payload.old.id)
      );
    } else {
      setItems((prevItems) => {
        const itemMap = new Map(prevItems.map((item) => [item.id, item]));
        const updatedItem = payload.new;

        itemMap.set(updatedItem.id, updatedItem);

        return Array.from(itemMap.values()).sort((a, b) =>
          (a.name || '').localeCompare(b.name || '', undefined, { sensitivity: 'base' })
        );
      });
    }
    setIsUpdating(false);
  };

  const handleRealtimeItemUpdate = (payload: Payload<T>) => {
    setData(payload.new);
    setIsUpdating(false);
  };

  const refetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const { data: allItems, error: itemsError } = await supabase
        .from<T>(tableName)
        .select('*');

      if (itemsError) throw itemsError;

      const sortedItems = (allItems || []).sort((a, b) =>
        (a.name || '').localeCompare(b.name || '', undefined, { sensitivity: 'base' })
      );
      setItems(sortedItems);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [tableName]);

  return { data, items, loading, error, isUpdating, refetchItems };
};

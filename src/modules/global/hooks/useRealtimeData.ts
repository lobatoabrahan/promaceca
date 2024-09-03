import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import subscribeToSupabaseChannel from '../../global/services/subscribeToSupabaseChannel';
import { realtimeUpdateHandler } from '../tools/realtimeUpdateHandler';

interface Identifiable {
    id: number;
}


// Restricción para asegurar que T tenga un 'id'
type UseRealtimeDataProps<T extends Identifiable> = {
    queryKey: string[];
    queryFn: () => Promise<T[]>;
    channelName: string;
};

export const useRealtimeData = <T extends Identifiable>({
    queryKey,
    queryFn,
    channelName,
}: UseRealtimeDataProps<T>) => {
    const [data, setData] = useState<T[]>([]);
    const [hasUpdates, setHasUpdates] = useState<boolean>(false);

    const { data: fetchedData, isLoading, isError, error } = useQuery<T[], Error>({
        queryKey,
        queryFn,
    });

    useEffect(() => {
        if (fetchedData) {
            setData(fetchedData);
        }
    }, [fetchedData]);

    useEffect(() => {
        const handleRealtimeUpdate = realtimeUpdateHandler<T>(setData);
        const channel = subscribeToSupabaseChannel(handleRealtimeUpdate, channelName);

        return () => {
            channel.unsubscribe();
        };
    }, [channelName]);

    useEffect(() => {
        if (hasUpdates) {
            setHasUpdates(false);
        }
    }, [hasUpdates]);

    return { data, isLoading, isError, error, hasUpdates };
};

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import subscribeToSupabaseChannel from '../../global/services/subscribeToSupabaseChannel';
import { RealTimePayLoadTypes } from '../types/realtimePayload';

interface Identifiable {
    id: number;
}

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

    // Fetch initial data
    const { data: fetchedData, isLoading, isError, error } = useQuery<T[], Error>({
        queryKey,
        queryFn,
    });

    useEffect(() => {
        if (fetchedData) {
            setData(fetchedData); // Set initial fetched data
        }
    }, [fetchedData]);

    // Subscribe to real-time updates
    useEffect(() => {
        // Function to handle real-time updates
        const handleRealtimeUpdate = (payload: RealTimePayLoadTypes<T>) => {
            setHasUpdates(true); // Mark that an update occurred

            switch (payload.eventType) {
                case 'INSERT':
                    setData(prev => [...prev, payload.new]);
                    break;
                case 'UPDATE':
                    setData(prev => prev.map(item => item.id === payload.new.id ? payload.new : item));
                    break;
                case 'DELETE':
                    setData(prev => prev.filter(item => item.id !== payload.old?.id));
                    break;
                default:
                    break;
            }
        };
        const channel = subscribeToSupabaseChannel(handleRealtimeUpdate, channelName);

        return () => {
            channel.unsubscribe(); // Cleanup on component unmount
        };
    }, [channelName]);

    useEffect(() => {
        if (hasUpdates) {
            setHasUpdates(false); // Reset updates flag
        }
    }, [hasUpdates]);

    return { data, isLoading, isError, error, hasUpdates };
};

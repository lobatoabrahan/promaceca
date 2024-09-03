// useSelect.ts

import { useState, useEffect } from 'react';

// Define la interfaz para las propiedades del hook useSelect
interface UseSelectProps<T, C> {
    data: T[];
    hasUpdates: boolean;
    formatOptions: (data: T[]) => { label: string; value: number }[];
    createEntity: (data: C) => Promise<{ id: number }>;
}

// Define el hook useSelect con tipos genéricos T y C
export const useSelect = <T, C>({
    data,
    hasUpdates,
    formatOptions,
    createEntity,
}: UseSelectProps<T, C>) => {
    const [options, setOptions] = useState<{ label: string; value: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        if (data.length > 0) {
            setOptions(formatOptions(data));
            setLoading(false);
        } else {
            setLoading(false);
            setOptions([]);
        }
    }, [data, formatOptions]);

    useEffect(() => {
        if (hasUpdates) {
            setOptions(formatOptions(data));
        }
    }, [hasUpdates, data, formatOptions]);

    // Función para crear una nueva entidad
    const onCreate = async () => {
        if (searchText.trim() === '') {
            throw new Error('The search text is empty.');
        }

        try {
            const newEntity = await createEntity({ name: searchText } as C);

            if (newEntity) {
                return newEntity.id;
            } else {
                throw new Error('Failed to create.');
            }
        } catch (error) {
            console.error(error);
            setError('Failed to create.');
            throw error;
        }
    };

    // Función para crear una nueva entidad y abrir el modal de edición
    const onCreateAndEdit = async () => {
        if (searchText.trim() === '') {
            throw new Error('The search text is empty.');
        }

        try {
            const newEntity = await createEntity({ name: searchText } as C);

            if (newEntity) {
                return newEntity.id;
            } else {
                throw new Error('Failed to create.');
            }
        } catch (error) {
            console.error(error);
            setError('Failed to create.');
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

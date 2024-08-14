import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchTransaccionesInventario, get_res_partner } from '../services/ApiServices';
import {  Partner, TransaccionInventario } from '../types';

interface DataContextType {
    transaccionesInventario: TransaccionInventario[];
    partner: Partner[]
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

interface DataProviderProps {
    children: React.ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [transaccionesInventario, setTransaccionesInventario] = useState<TransaccionInventario[]>([]);
    const [partner, setPartner] = useState<Partner[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const [fetchedTransaccionesInventario , partners] = await Promise.all([
                fetchTransaccionesInventario(),
                get_res_partner()
            ]);
            setTransaccionesInventario(fetchedTransaccionesInventario);
            if (partners.error) {
                console.error('Error fetching partners:', partners.error);
            } else {
                setPartner(partners.data || []);
            }
        };
        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ transaccionesInventario, partner }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;

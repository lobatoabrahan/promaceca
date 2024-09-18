import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { CountryStates } from '../types/CountryTypes';
import { useNavigate } from 'react-router-dom';
import { useCountryStateRealtime } from '../hooks/useCountryStateRealtime';

const CountryStateList: React.FC = () => {
    const navigate = useNavigate(); // Usa useNavigate

    const columns: TableProps<CountryStates>['columns'] = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => {
                return (
                    <div 
                        onClick={() => { navigate(`/contactos/estado/${record.id}`); }}
                        style={{ cursor: 'pointer', padding: '8px', backgroundColor: '#fafafa' }}
                    >
                        {text}
                    </div>
                );
            },
        },
        {
            title: 'Codigo',
            dataIndex: 'code',
            key: 'code',
        },
    ];

    const { countrysStates, countrysStatesIsLoading } = useCountryStateRealtime();
    
    return (
        <Table
            columns={columns}
            dataSource={countrysStates}
            loading={countrysStatesIsLoading}
            rowKey="id" // Asegúrate de que el `dataSource` tenga una clave única para cada fila
        />
    );
};

export default CountryStateList;

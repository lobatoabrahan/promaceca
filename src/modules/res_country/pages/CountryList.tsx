import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { useCountryRealtime } from '../hooks/useCountryRealtime';
import { Country } from '../types/CountryTypes';
import { useNavigate } from 'react-router-dom';

const CountryList: React.FC = () => {
    const navigate = useNavigate(); // Usa useNavigate

    const columns: TableProps<Country>['columns'] = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => {
                return (
                    <div 
                        onClick={() => { navigate(`/contactos/pais/${record.id}`); }}
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

    const { countrys, countrysIsLoading } = useCountryRealtime();
    
    return (
        <Table
            columns={columns}
            dataSource={countrys}
            loading={countrysIsLoading}
            rowKey="id" // Asegúrate de que el `dataSource` tenga una clave única para cada fila
        />
    );
};

export default CountryList;

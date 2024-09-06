import React from 'react';
import { Alert, Drawer } from 'antd';
import useOnFormSuccess from '../../global/hooks/useOnFormSuccess';
import { DrawerPropsTypes } from '../../global/types/DrawerProps';
import { useCountryRealtimeById } from '../hooks/useCountryRealtimeById';
import CountryForm from './CountryForm';

const CountryDrawer: React.FC<DrawerPropsTypes> = ({ isOpen, onClose, id, onSuccess }) => {
    const { country, countryIsLoading, countryIsError, countryError } = useCountryRealtimeById(id);
    const handleSuccess = useOnFormSuccess(onSuccess)

    if (countryIsError) return <Alert message={countryError?.message} type="error" />;

    return (
        <Drawer
            loading={countryIsLoading}
            title="Editar Banco"
            open={isOpen}
            onClose={onClose}
            footer={null}
        >
            <CountryForm country={country ? country : undefined} onSuccess={handleSuccess} />
        </Drawer>
    );
};

export default CountryDrawer;

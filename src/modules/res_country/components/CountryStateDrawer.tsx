import React from 'react';
import { Alert, Drawer } from 'antd';
import useOnFormSuccess from '../../global/hooks/useOnFormSuccess';
import { DrawerPropsTypes } from '../../global/types/DrawerProps';
import CountryStateForm from './CountryStateForm';
import { useCountryStateRealtimeById } from '../hooks/useCountryStateRealtime';

const CountryStateDrawer: React.FC<DrawerPropsTypes> = ({ isOpen, onClose, id, onSuccess }) => {
    const { countryState, countryStateIsLoading, countryStateIsError, countryStateError } = useCountryStateRealtimeById(id);
    const handleSuccess = useOnFormSuccess(onSuccess)

    if (countryStateIsError) return <Alert message={countryStateError?.message} type="error" />;

    return (
        <Drawer
            loading={countryStateIsLoading}
            title="Editar Estado"
            open={isOpen}
            onClose={onClose}
            footer={null}
        >
            <CountryStateForm data={countryState ? countryState : undefined} onSuccess={handleSuccess} />
        </Drawer>
    );
};

export default CountryStateDrawer;

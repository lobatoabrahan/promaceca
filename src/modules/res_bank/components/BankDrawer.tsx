import React from 'react';
import { Alert, Drawer } from 'antd';
import BankForm from './BankForm';
import { useBankRealtimeById } from '../hooks/useBankRealtimeById';
import useOnFormSuccess from '../../global/hooks/useOnFormSuccess';
import { DrawerPropsTypes } from '../../global/types/DrawerProps';

const BankDrawer: React.FC<DrawerPropsTypes> = ({ isOpen, onClose, id, onSuccess }) => {
    const { bank, bankIsLoading, bankIsError, bankError } = useBankRealtimeById(id);
    const handleSuccess = useOnFormSuccess(onSuccess)

    if (bankIsError) return <Alert message={bankError?.message} type="error" />;

    return (
        <Drawer
            loading={bankIsLoading}
            title="Editar Banco"
            open={isOpen}
            onClose={onClose}
            footer={null}
        >
            <BankForm bank={bank ? bank : undefined} onSuccess={handleSuccess} />
        </Drawer>
    );
};

export default BankDrawer;

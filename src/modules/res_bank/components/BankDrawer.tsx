import React from 'react';
import { Alert, Drawer } from 'antd';
import BankForm from './BankForm';
import { useBankRealtimeById } from '../hooks/useBankRealtimeById';
import useOnFormSuccess from '../../global/hooks/useOnFormSuccess';
import { DrawerPropsTypes } from '../../global/types/DrawerProps';

const BankDrawer: React.FC<DrawerPropsTypes> = ({ isOpen, onClose, id, onSuccess }) => {
    const { bank, isLoading, isError, error } = useBankRealtimeById(id);
    const handleSuccess = useOnFormSuccess(onSuccess)

    if (isError) return <Alert message={(error as Error).message} type="error" />;

    return (
        <Drawer
            loading={isLoading}
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

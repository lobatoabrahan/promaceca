import React from 'react';
import { Alert, Drawer } from 'antd';
import BankForm from './BankForm';
import { useBankRealtimeById } from '../hooks/useBankRealtimeById';

interface BankDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    id: number;
    onSuccess?: () => void; // Función opcional para manejar el éxito
}

const BankDrawer: React.FC<BankDrawerProps> = ({ isOpen, onClose, id, onSuccess }) => {
    const { bank, isLoading, isError, error } = useBankRealtimeById(id);

    // Maneja el caso en el que el banco no esté disponible
    const handleSuccess = () => {
        if (onSuccess) {
            onSuccess(); // Llama a la función de éxito si está definida
        }
    };

    if (isError) return <Alert message={(error as Error).message} type="error" />;

    return (
        <Drawer
            loading={isLoading}
            title="Editar Banco"
            open={isOpen}
            onClose={onClose}
            footer={null} // No hay botones en el pie, los gestionamos en el formulario
        >
            <BankForm bank={bank ? bank : undefined} onSuccess={handleSuccess} />
        </Drawer>
    );
};

export default BankDrawer;

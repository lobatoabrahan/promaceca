import React, { useEffect, useState } from 'react';
import { Alert, Modal } from 'antd';
import { Bank } from '../types/BankTypes';
import BankForm from './BankForm';
import { useRealtimeBankById } from '../hooks/useBankRealtimeById';
import { useQuery } from '@tanstack/react-query';
import { fetchBankById } from '../services/fetchBankById';

interface BankModalProps {
    isOpen: boolean;
    onClose: () => void;
    id: number;
    onSuccess?: () => void; // Función opcional para manejar el éxito
}

const BankModal: React.FC<BankModalProps> = ({ isOpen, onClose, id, onSuccess }) => {
    const { bank: realtimeBank, hasUpdates } = useRealtimeBankById(id);
    const [bank, setBank] = useState<Bank | null>(null);

    // Realiza la consulta inicial para obtener los datos del banco
    const { data, isLoading, isError, error } = useQuery<Bank | null, Error>({
        queryKey: ['bank', id],
        queryFn: () => fetchBankById(id!),
        enabled: !!id, // Solo realiza la consulta si id está definido
    });

    // Cargar datos iniciales desde el fetch
    useEffect(() => {
        if (data) {
            setBank(data);
        }
    }, [data]);

    // Actualizar datos en tiempo real
    useEffect(() => {
        if (realtimeBank) {
            setBank(realtimeBank);
        }
    }, [realtimeBank, hasUpdates]);

    const handleSuccess = () => {
        if (onSuccess) {
            onSuccess(); // Llama a la función de éxito si está definida
        }
        return
    };

    if (isError) return <Alert message={(error as Error).message} type="error" />;

    return (
        <Modal

            loading={isLoading}
            title={'Editar Banco'}
            open={isOpen}
            onCancel={onClose}
            footer={null} // No hay botones en el pie, los gestionamos en el formulario
        >
            <BankForm bank={bank} onSuccess={handleSuccess} />
        </Modal>
    );
};

export default BankModal;

import { useForm } from 'antd/es/form/Form';
import { useCallback, useState } from 'react';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Bank } from '../types/BankTypes';
import { updateBank } from '../services/updateBank';
import { createBank } from '../services/createBank';

interface UseBankFormProps {
  onSuccess?: () => void; 
}

export const useBankForm = ({ onSuccess }: UseBankFormProps = {}) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Bank | null>(null);
  const navigate = useNavigate(); 

  const onFinish = useCallback(async (values: Bank) => {
    try {
      setLoading(true);
      if (data?.id) {
        values.id = data.id;
        await updateBank(values);
        notification.success({
          message: 'Exito',
          description: 'Los detalles del banco han sido actualizados.',
        });
      } else {
        const newBank = await createBank(values);
        notification.success({
          message: 'Exito',
          description: 'Baanco ha sido creado exitosamente.',
        });
        if (newBank?.id) {
          navigate(`/contactos/banco/${newBank.id}`); 
        }
      }
      if (onSuccess) {
        onSuccess(); 
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Ha ocurrido un error al intentar crear o editar el banco. Por favor intente de nuevo',
      });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [data, onSuccess, navigate]);

  const setFormValues = useCallback((bank: Bank) => {
    form.setFieldsValue(bank);
    setData(bank);
  }, [form]);

  return { form, onFinish, setFormValues, loading };
};

import { useForm } from 'antd/es/form/Form';
import { useCallback, useState } from 'react';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createCountryState, updateCountryState } from '../services/countryStatesServices';
import { CountryStates } from '../types/CountryTypes';

interface Props {
  onSuccess?: () => void; 
}

export const useCountryStatesForm = ({ onSuccess }: Props = {}) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CountryStates | null>(null);
  const navigate = useNavigate(); 

  const onFinish = useCallback(async (values: CountryStates) => {
    try {
      setLoading(true);
      if (data?.id) {
        values.id = data.id;
        await updateCountryState(values);
        notification.success({
          message: 'Exito',
          description: 'Los detalles del estado han sido actualizados.',
        });
      } else {
        const data = await createCountryState(values);
        notification.success({
          message: 'Exito',
          description: 'Baanco ha sido creado exitosamente.',
        });
        if (data?.id) {
          navigate(`/contactos/estado/${data.id}`); 
        }
      }
      if (onSuccess) {
        onSuccess(); 
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Ha ocurrido un error al intentar crear o editar el estado. Por favor intente de nuevo',
      });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [data, onSuccess, navigate]);

  const setFormValues = useCallback((data: CountryStates) => {
    form.setFieldsValue(data);
    setData(data);
  }, [form]);

  return { form, onFinish, setFormValues, loading };
};

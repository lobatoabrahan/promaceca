import { useForm } from 'antd/es/form/Form';
import { useCallback, useState } from 'react';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Country } from '../types/CountryTypes';
import { createCountry, updateCountry } from '../services/countryServices';

interface UseCountryFormProps {
  onSuccess?: () => void; 
}

export const useCountryForm = ({ onSuccess }: UseCountryFormProps = {}) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Country | null>(null);
  const navigate = useNavigate(); 

  const onFinish = useCallback(async (values: Country) => {
    try {
      setLoading(true);
      if (data?.id) {
        values.id = data.id;
        await updateCountry(values);
        notification.success({
          message: 'Exito',
          description: 'Los detalles del pais han sido actualizados.',
        });
      } else {
        const data = await createCountry(values);
        notification.success({
          message: 'Exito',
          description: 'Baanco ha sido creado exitosamente.',
        });
        if (data?.id) {
          navigate(`/contactos/pais/${data.id}`); 
        }
      }
      if (onSuccess) {
        onSuccess(); 
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Ha ocurrido un error al intentar crear o editar el pais. Por favor intente de nuevo',
      });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [data, onSuccess, navigate]);

  const setFormValues = useCallback((data: Country) => {
    form.setFieldsValue(data);
    setData(data);
  }, [form]);

  return { form, onFinish, setFormValues, loading };
};

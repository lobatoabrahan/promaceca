import { useForm } from 'antd/es/form/Form';
import { useCallback, useState } from 'react';
import { notification } from 'antd';
import { Bank } from '../types/BankTypes';
import { updateBank } from '../services/updateBank';
import { createBank } from '../services/createBank';

export const useBankForm = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Bank|null>(null)

  const onFinish = useCallback(async (values: Bank) => {
    try {
      setLoading(true);
      if (data?.id) {
        values.id = data.id
        // Editar banco existente
        await updateBank(values);
        notification.success({
          message: 'Success',
          description: 'Bank details have been updated successfully.',
        });
      } else {
        // Crear un nuevo banco
        await createBank(values);
        notification.success({
          message: 'Success',
          description: 'Bank has been created successfully.',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'There was an error saving the bank details. Please try again.',
      });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [data]);

  const setFormValues = useCallback((bank: Bank) => {
    console.log(bank)
    form.setFieldsValue(bank);
    setData(bank)
  }, [form]);

  return { form, onFinish, setFormValues, loading };
};
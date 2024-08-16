import { useForm } from 'antd/es/form/Form';
import { useCallback, useState } from 'react';
import { notification } from 'antd';
import { BankTypes } from '../types/BankTypes';
import { updateBank } from '../services/updateBank';
import { createBank } from '../services/createBank';

export const useBankForm = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = useCallback(async (values: BankTypes) => {
    try {
      setLoading(true);
      if (values.id) {
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
  }, []);

  const setFormValues = useCallback((bank: BankTypes) => {
    form.setFieldsValue(bank);
  }, [form]);

  return { form, onFinish, setFormValues, loading };
};
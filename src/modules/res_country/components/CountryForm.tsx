import React, { useEffect } from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import { Country } from '../types/CountryTypes';
import { useCountryForm } from '../hooks/useCountryForm';

interface BankFormProps {
  country?: Country; // Para la edición, puede recibir una ubicación existente
  onSuccess?: () => void; // Función opcional para manejar el éxito
}

const CountryForm: React.FC<BankFormProps> = ({ country, onSuccess }) => {
  const { form, onFinish, loading, setFormValues } = useCountryForm({ onSuccess });

  useEffect(() => {
    if (country) {
      setFormValues(country);
    }
  }, [country, setFormValues]);

  return (
    <Form
      form={form}
      onFinish={onFinish}
    >

      <Form.Item
        label="Name"
        name={['name', 'es_VE']} // Notación para campos anidados
        rules={[{ required: true, message: 'Por favor introduzca el nombre del país!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Currency"
        name="currency_id"
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Phone Code"
        name="phone_code"
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Code"
        name="code"
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CountryForm;


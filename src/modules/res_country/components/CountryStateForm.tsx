import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { CountryStates } from '../types/CountryTypes';
import { useCountryStatesForm } from '../hooks/useCountryStatesForm';
import CountrySelect from './CountrySelect';

interface Props {
  data?: CountryStates; // Para la edición, puede recibir una ubicación existente
  onSuccess?: () => void; // Función opcional para manejar el éxito
}

const CountryStateForm: React.FC<Props> = ({ data, onSuccess }) => {
  const { form, onFinish, loading, setFormValues } = useCountryStatesForm({ onSuccess });

  useEffect(() => {
    if (data) {
      setFormValues(data);
    }
  }, [data, setFormValues]);

  return (
    <Form
      form={form}
      onFinish={onFinish}
    >

      <Form.Item
        label="Name"
        name={['name']} // Notación para campos anidados
        rules={[{ required: true, message: 'Por favor introduzca el nombre del estado!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Code"
        name="code"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="country"
        label="Seleccione un Pais"
      >
        <CountrySelect
          onSelect={(value) => form.setFieldsValue({ country: value })}
          value={form.getFieldValue('country')}
        />
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

export default CountryStateForm;


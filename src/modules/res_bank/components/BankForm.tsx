import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useBankForm } from '../hooks/useBankForm';
import { Bank } from '../types/BankTypes';
import CountrySelect from '../../res_country/components/CountrySelect';

interface BankFormProps {
  bank?: Bank; // Para la edición, puede recibir una ubicación existente
  onSuccess?: () => void; // Función opcional para manejar el éxito
}

const BankForm: React.FC<BankFormProps> = ({ bank, onSuccess }) => {
  const { form, onFinish, loading, setFormValues } = useBankForm({ onSuccess });

  useEffect(() => {
    if (bank) {
      setFormValues(bank);
    }
  }, [bank, setFormValues]);

  return (
    <Form
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input the bank name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Street"
        name="street"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Street 2"
        name="street2"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="ZIP"
        name="zip"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="City"
        name="city"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="State"
        name="state"
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

      <Form.Item
        label="Email"
        name="email"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="BIC"
        name="bic"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="active"
        valuePropName="checked"
      >
        <Checkbox>Active</Checkbox>
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

export default BankForm;


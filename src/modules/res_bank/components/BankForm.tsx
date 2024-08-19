import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useBankForm } from '../hooks/useBankForm';
import { Bank } from '../types/BankTypes';
import BankSelect from './BankSelect';

interface BankFormProps {
    bank?: Bank; // Para la edición, puede recibir una ubicación existente
  }

const BankForm: React.FC<BankFormProps> = ({ bank }) => {
  const { form, onFinish, loading, setFormValues } = useBankForm();

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
        name="bank"
        label="Seleccione un banco"
      >
        <BankSelect
          onSelect={(value) => form.setFieldsValue({ bank: value })}
          value={form.getFieldValue('bank')}
        />
      </Form.Item>
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
        label="Country"
        name="country"
      >
        <Input />
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


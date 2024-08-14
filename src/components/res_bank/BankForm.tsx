import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, Spin, Alert } from 'antd';
import { useBankFormLogic } from './useBankFormLogic';
import { Bank } from '../../types';
import { useBankApi } from './useBankFetch';

interface BankFormProps {
  bankId: number | null;
  onSubmitSuccess?: () => void; // Optional callback for successful submission
}

const BankForm: React.FC<BankFormProps> = ({ bankId, onSubmitSuccess }) => {
  const { data, loading: fetchingData, error: fetchError } = useBankApi(bankId);
  const { handleSubmit, loading: submitting, error: submitError } = useBankFormLogic();
  const [form] = Form.useForm();

  // Populate form with fetched data when it is available
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const onFinish = async (values: Bank) => {
    await handleSubmit(bankId, values);
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  if (fetchingData) {
    return <div><Spin /> Loading...</div>;
  }

  if (fetchError) {
    return <div><Alert message="Error" description={fetchError.message} type="error" showIcon /></div>;
  }

  return (
    <Form
      form={form}
      initialValues={data || {}}
      onFinish={onFinish}
    >
      {submitError && <Alert message="Error" description={submitError} type="error" showIcon />}
      
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
        rules={[{ type: 'email', message: 'Please input a valid email!' }]}
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
          loading={submitting} // Add loading state to the button
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BankForm;

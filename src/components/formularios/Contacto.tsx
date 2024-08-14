import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Spin,
  message,
  Upload,
  Row,
  Col,
  Select,
  Image,
} from 'antd';
import { Partner } from '../../types';
import { supabase } from '../../supabase/supabaseClient';
import { useNavigate, useParams } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import BankSelect from '../res_bank/BankSelect';

interface Country {
  id: number;
  name: { en_US: string };
}

const Contacto: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(true);
  const [initialValues, setInitialValues] = useState<Partner | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartner = async () => {
      if (id) {
        // Fetch existing partner data if an ID is present
        const { data, error } = await supabase
          .from('res_partner')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching partner:', error);
          message.error('Error fetching partner');
        } else {
          setInitialValues(data || null);
          form.setFieldsValue(data || {});
        }
      }
      setLoading(false);
    };

    const fetchCountries = async () => {
      const { data, error } = await supabase
        .from('res_country')
        .select('id, name');

      if (error) {
        console.error('Error fetching countries:', error);
        message.error('Error fetching countries');
      } else {
        const countriesData = data.map(
          (country: { id: number; name: { en_US: string } }) => ({
            id: country.id,
            name: country.name,
          })
        );
        setCountries(countriesData);
        setFilteredCountries(countriesData); // Initialize filteredCountries with all countries
      }
    };

    fetchPartner();
    fetchCountries();
  }, [id, form]);

  const handleSave = async (values: Partner) => {
    setLoading(true);

    try {
      if (id) {
        // Update existing partner
        /* const { error } = await supabase
          .from('res_partner')
          .update(values)
          .eq('id', id);

        if (error) {
          throw new Error('Error updating partner');
        }
        message.success('Partner updated successfully'); */
        console.log(values);
      } else {
        // Create new partner
        /* const { error } = await supabase
          .from('res_partner')
          .insert([values]);

        if (error) {
          throw new Error('Error creating partner');
        }
        message.success('Partner created successfully'); */
        console.log(values);
      }
      /* navigate('/contactos'); */
    } catch (error) {
      console.error(error);
      message.error(error.message || 'Error saving partner');
    }

    setLoading(false);
  };

  const handleUploadChange = async (info: any) => {
    if (info.file.status === 'done') {
      // Handle the file upload
      const { data, error } = await supabase.storage
        .from('profile-images') // Replace with your bucket name
        .upload(`public/${info.file.name}`, info.file.originFileObj);

      if (error) {
        console.error('Error uploading image:', error);
        message.error('Error uploading image');
      } else {
        const imageUrl = `${supabase.storageUrl}/profile-images/${info.file.name}`;
        form.setFieldsValue({ profile_image: imageUrl });
        message.success('Image uploaded successfully');
      }
    }
  };

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Form
          form={form}
          onFinish={handleSave}
          initialValues={initialValues}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter the name' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please enter the email' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Phone" name="phone">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Company" name="company">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Address" name="address">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="City" name="city">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true, message: 'Please select a country' }]}
              >
                <Select
                  showSearch
                  placeholder="Select a country"
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={filteredCountries.map((country) => ({
                    value: country.id,
                    label: country.name.en_US,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Postal Code" name="postal_code">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Col span={12}>
            <Form.Item label="Profile Image" name="profile_image">
              {initialValues?.profile_image ? (
                <Image
                  width={200}
                  src={initialValues.profile_image}
                  alt="Profile Image"
                />
              ) : (
                <Upload
                  customRequest={handleUploadChange}
                  showUploadList={false}
                  accept="image/*"
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                {id ? 'Save Changes' : 'Create Partner'}
              </Button>
            </Form.Item>
          </Col>
          <Col span={12}>
            <BankSelect />
          </Col>
        </Form>
      )}
    </div>
  );
};

export default Contacto;

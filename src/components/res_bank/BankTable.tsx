import React, { useState } from 'react';
import { Table, Typography, Button, Space, Spin, Alert, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { useBankApi } from './useBankFetch';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const BankTable: React.FC = () => {
  const { items, loading, error } = useBankApi(null);
  const navigate = useNavigate(); // For navigation

  const handleRowClick = (id: number) => {
    navigate(`/contactos/banco/${id}`); // Navigate to the bank details page
  };

  const handleAddNewBank = () => {
    navigate('/contactos/banco/nuevo'); // Navigate to the new bank form
  };

  // Local state to manage search text
  const [searchText, setSearchText] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<{ [key: string]: string[] }>({
    name: [],
    bic: [],
    city: [],
  });

  // Filter function for columns
  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  // Filtered data source based on search text and selected filters
  const filteredBanks = items.filter(bank => {
    return (
      (selectedFilter.name.length === 0 || selectedFilter.name.includes(bank.name)) &&
      (selectedFilter.bic.length === 0 || (bank.bic || '').includes(selectedFilter.bic)) &&
      (selectedFilter.city.length === 0 || (bank.city || '').includes(selectedFilter.city)) &&
      (bank.name.toLowerCase().includes(searchText) ||
       (bank.bic || '').toLowerCase().includes(searchText) ||
       (bank.city || '').toLowerCase().includes(searchText))
    );
  });

  const columns = [
    {
      title: 'Bank Name',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div style={{ padding: 8 }}>
          <Select
            mode="multiple"
            placeholder="Select Bank Name"
            style={{ width: 200, marginBottom: 8, display: 'block' }}
            onChange={(values) => setSelectedFilter(prev => ({ ...prev, name: values }))}
            value={selectedFilter.name}
          >
            {[...new Set(items.map(bank => bank.name))].map(name => (
              <Option key={name} value={name}>{name}</Option>
            ))}
          </Select>
          <Input
            placeholder="Search Bank Name"
            value={selectedKeys[0] || ''}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            style={{ width: '100%' }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && clearFilters()}
            style={{ width: '100%', marginTop: 8 }}
          >
            Reset
          </Button>
        </div>
      ),
      filterIcon: () => <SearchOutlined />,
      onFilter: (value, record) => record.name.toLowerCase().includes((value as string).toLowerCase()),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'BIC',
      dataIndex: 'bic',
      key: 'bic',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div style={{ padding: 8 }}>
          <Select
            mode="multiple"
            placeholder="Select BIC"
            style={{ width: 200, marginBottom: 8, display: 'block' }}
            onChange={(values) => setSelectedFilter(prev => ({ ...prev, bic: values }))}
            value={selectedFilter.bic}
          >
            {[...new Set(items.map(bank => bank.bic))].map(bic => (
              <Option key={bic} value={bic}>{bic}</Option>
            ))}
          </Select>
          <Input
            placeholder="Search BIC"
            value={selectedKeys[0] || ''}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            style={{ width: '100%' }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && clearFilters()}
            style={{ width: '100%', marginTop: 8 }}
          >
            Reset
          </Button>
        </div>
      ),
      filterIcon: () => <SearchOutlined />,
      onFilter: (value, record) => (record.bic || '').toLowerCase().includes((value as string).toLowerCase()),
      sorter: (a, b) => (a.bic || '').localeCompare(b.bic || ''),
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div style={{ padding: 8 }}>
          <Select
            mode="multiple"
            placeholder="Select City"
            style={{ width: 200, marginBottom: 8, display: 'block' }}
            onChange={(values) => setSelectedFilter(prev => ({ ...prev, city: values }))}
            value={selectedFilter.city}
          >
            {[...new Set(items.map(bank => bank.city))].map(city => (
              <Option key={city} value={city}>{city}</Option>
            ))}
          </Select>
          <Input
            placeholder="Search City"
            value={selectedKeys[0] || ''}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            style={{ width: '100%' }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && clearFilters()}
            style={{ width: '100%', marginTop: 8 }}
          >
            Reset
          </Button>
        </div>
      ),
      filterIcon: () => <SearchOutlined />,
      onFilter: (value, record) => (record.city || '').toLowerCase().includes((value as string).toLowerCase()),
      sorter: (a, b) => (a.city || '').localeCompare(b.city || ''),
    },
    // Add more columns as needed
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Title level={2}>Bank List</Title>
        <Button type="primary" onClick={handleAddNewBank}>
          Add New Bank
        </Button>
      </Space>
      {error && <Alert message="Error" description={error} type="error" showIcon />}
      <Table
        dataSource={filteredBanks}
        columns={columns}
        rowKey="id"
        bordered
        onRow={(record) => ({
          onClick: () => handleRowClick(record.id),
        })}
        loading={loading}
      />
    </div>
  );
};

export default BankTable;

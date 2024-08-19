import React, { useState } from 'react';
import { Select, Alert, Button } from 'antd';
import { useBankSelect } from '../hooks/useBankSelect';

interface BankSelectProps {
  onSelect: (value: number) => void;
  value?: number;
}

const BankSelect: React.FC<BankSelectProps> = ({ onSelect, value }) => {
  const { banks, loading, error, onCreate, onCreateAndEdit, setSearchText, searchText } = useBankSelect();
  const [selectLoading, setSelectLoading] = useState(Boolean)

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const selectOnCreate = async () => {
    setSelectLoading(true)
    try {
      const id = await onCreate(); // Llama a onCreate para crear el banco y obtener el ID
      onSelect(id); // Selecciona el banco recién creado utilizando el ID
      setSelectLoading(false)
    } catch (error) {
      console.error('Failed to create and select a new bank:', error);
      setSelectLoading(false)
    }
  };

  

  if (error) return <Alert message={error} type="error" />;

  return (
    <Select
      value={value}
      onChange={onSelect}
      placeholder="Select a bank"
      style={{ width: '100%' }}
      showSearch
      onSearch={handleSearch}
      allowClear
      loading={loading}
      filterOption={(input, option) => {
        if (option && option.label) {
          return option.label.toLowerCase().includes(input.toLowerCase());
        }
        return false;
      }}
      options={banks}
      optionFilterProp="label"
      dropdownRender={menu => (
        <>
          {menu}
          <div
            style={{ display: 'flex', flexDirection: 'column', padding: 8 }}
          >
            <Button
            loading={selectLoading}
              type="link"
              onClick={selectOnCreate}
            >
              Crea "{searchText}"
            </Button>
            <Button
              type="link"
              onClick={onCreateAndEdit}
            >
              Crea y edita "{searchText}"
            </Button>
          </div>
        </>
      )}
    >
    </Select>
  );
};

export default BankSelect;

import React from 'react';
import { Select, Spin, Alert, Button } from 'antd';
import { useBankSelect } from '../hooks/useBankSelect';

interface BankSelectProps {
  onSelect: (value: number) => void;
  value?: number;
}

const BankSelect: React.FC<BankSelectProps> = ({ onSelect, value }) => {
  const { banks, loading, error, onCreate, onCreateAndEdit, setSearchText, searchText } = useBankSelect();

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  

  if (loading) return <Spin />;
  if (error) return <Alert message={error} type="error" />;

  return (
    <Select
      value={value}
      onChange={onSelect}
      placeholder="Select a bank"
      style={{ width: '100%' }}
      showSearch
      onSearch={handleSearch}

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
              type="link"
              onClick={onCreate}
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

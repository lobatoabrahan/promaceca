// components/BankList.tsx
import React from 'react';
import { Select, Alert } from 'antd';
import { useBankApi } from './useBankFetch';

const { Option } = Select;

interface BankListProps {
  value?: number | string;
  onChange?: (value: number | string) => void;
  onSearch?: (value: string) => void;
  filterOptions?: (input: string, option: any) => boolean;
  updateKey: number;
  dropdownRender?: (menu: React.ReactNode) => React.ReactNode;
}

const BankList: React.FC<BankListProps> = ({
  value,
  onChange,
  onSearch,
  filterOptions,
  updateKey,
  dropdownRender,
}) => {
  const { items, loading: loadingBanks, error: banksError } = useBankApi(null);

  return (
    <div>
      {banksError && (
        <Alert message="Error" description={banksError} type="error" showIcon />
      )}
      <Select
        showSearch
        loading={loadingBanks}
        value={value}
        placeholder="Select or create a bank"
        onSearch={onSearch}
        onChange={onChange}
        style={{ minWidth: 300 }}
        filterOption={filterOptions}
        dropdownRender={dropdownRender}
      >
        {items.map((bank) => (
          <Option key={bank.id} value={bank.id}>
            {bank.bic ? `${bank.name} - ${bank.bic}` : bank.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default React.memo(BankList);

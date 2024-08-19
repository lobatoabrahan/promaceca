import React from 'react';
import { Select, Spin, Alert } from 'antd';
import { useBankSelect } from '../hooks/useBankSelect';

interface BankSelectProps {
  onSelect: (value: number) => void;
  value?: number;
}

const BankSelect: React.FC<BankSelectProps> = ({ onSelect, value }) => {
  const { banks, loading, error } = useBankSelect();

  if (loading) return <Spin />;
  if (error) return <Alert message={error} type="error" />;

  return (
    <Select
      value={value}
      onChange={onSelect}
      options={banks}
      placeholder="Select a bank"
      style={{ width: '100%' }}
    />
  );
};

export default BankSelect;

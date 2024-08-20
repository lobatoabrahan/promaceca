import React from 'react';
import { useBankSelect } from '../hooks/useBankSelect';
import GlobalSelect from '../../global/components/GlobalSelect';



export const BankSelect: React.FC<{ value?: number; onSelect: (value: number) => void }> = ({ value, onSelect }) => (
  <GlobalSelect
    placeholder="Select a bank"
    value={value}
    onSelect={onSelect}
    useCustomHook={useBankSelect}
  />
);
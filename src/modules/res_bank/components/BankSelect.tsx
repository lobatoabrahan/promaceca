import React from 'react';
import { useBankSelect } from '../hooks/useBankSelect';
import GlobalSelect from '../../global/components/GlobalSelect';
import BankDrawer from './BankDrawer';

const BankSelect: React.FC<{ value?: number; onSelect: (value: number) => void }> = ({ value, onSelect }) => (
  <GlobalSelect
    placeholder="Selecciona un banco"
    value={value}
    onSelect={onSelect}
    useCustomHook={useBankSelect}
    DrawerComponent={BankDrawer}
  />
);

export default BankSelect
import React, { useEffect, useState } from 'react';
import { useBankSelect } from '../hooks/useBankSelect';
import GlobalSelect from '../../global/components/GlobalSelect';
import BankDrawer from './BankDrawer';

const BankSelect: React.FC<{
  value?: number;
  onSelect: (value: number) => void;
}> = ({ value, onSelect }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [key, setKey] = useState(Date.now());

  useEffect(() => {
    if (!isDrawerOpen) {
      setKey(Date.now());
    }
  }, [isDrawerOpen]);

  return (
    <GlobalSelect
      key={key}
      placeholder="Selecciona un banco"
      value={value}
      onSelect={onSelect}
      useCustomHook={useBankSelect}
      DrawerComponent={BankDrawer}
      isDrawerOpen={isDrawerOpen}
      setIsDrawerOpen={setIsDrawerOpen}
    />
  );
};

export default BankSelect;

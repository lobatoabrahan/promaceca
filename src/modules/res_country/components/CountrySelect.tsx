import React, { useEffect, useState } from 'react';
import GlobalSelect from '../../global/components/GlobalSelect';
import { useCountrySelect } from '../hooks/useCountrySelect';
import CountryDrawer from './CountryDrawer';

const CountrySelect: React.FC<{
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
      placeholder="Selecciona un pais"
      value={value}
      onSelect={onSelect}
      useCustomHook={useCountrySelect}
      DrawerComponent={CountryDrawer}
      isDrawerOpen={isDrawerOpen}
      setIsDrawerOpen={setIsDrawerOpen}
    />
  );
};

export default CountrySelect;

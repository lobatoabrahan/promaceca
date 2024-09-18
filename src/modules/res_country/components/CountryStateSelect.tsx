import React, { useEffect, useState } from 'react';
import GlobalSelect from '../../global/components/GlobalSelect';
import { useCountryStateSelect } from '../hooks/useCountryStateSelect';
import CountryStateDrawer from './CountryStateDrawer';

const CountryStateSelect: React.FC<{
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
      placeholder="Selecciona un estado"
      value={value}
      onSelect={onSelect}
      useCustomHook={useCountryStateSelect}
      DrawerComponent={CountryStateDrawer}
      isDrawerOpen={isDrawerOpen}
      setIsDrawerOpen={setIsDrawerOpen}
    />
  );
};

export default CountryStateSelect;

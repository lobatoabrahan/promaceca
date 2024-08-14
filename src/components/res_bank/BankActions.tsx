// components/BankActions.tsx
import React, { useCallback } from 'react';
import { Button } from 'antd';
import { useBankFormLogic } from './useBankFormLogic';

interface BankActionsProps {
  searchText: string;
  onSuccess: () => void;
}

const BankActions: React.FC<BankActionsProps> = ({ searchText, onSuccess }) => {
  const { handleSubmit, loading: formLoading } = useBankFormLogic();

  const handleCreateAndSelect = useCallback(async () => {
    try {
      const newBank = await handleSubmit(null, { name: searchText });
      if (newBank) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error adding bank:', error);
    }
  }, [searchText, handleSubmit, onSuccess]);

  const handleCreateAndEdit = useCallback(async () => {
    try {
      const newBank = await handleSubmit(null, { name: searchText });
      if (newBank) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error adding bank:', error);
    }
  }, [searchText, handleSubmit, onSuccess]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: 8 }}>
      <Button
        type="link"
        onClick={handleCreateAndSelect}
        loading={formLoading}
      >
        Create "{searchText}"
      </Button>
      <Button
        type="link"
        onClick={handleCreateAndEdit}
        loading={formLoading}
      >
        Create and Edit "{searchText}"
      </Button>
    </div>
  );
};

export default React.memo(BankActions);

import React, { useState, useCallback, useEffect } from 'react';
import { Select, Button, Alert, Modal } from 'antd';
import BankForm from './BankForm';
import { useBankApi } from './useBankFetch'; // Asegúrate de que useBankApi maneje el estado de actualización
import { useBankFormLogic } from './useBankFormLogic';

const { Option } = Select;

interface BankSelectProps {
  value?: number | string;
  onChange?: (value: number | string) => void;
}

const BankSelect: React.FC<BankSelectProps> = ({ value, onChange }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingBankId, setEditingBankId] = useState<number | null>(null);
  const [selectedValue, setSelectedValue] = useState<number | string | undefined>(value);
  const [updateKey, setUpdateKey] = useState<number>(Date.now()); // Use this to force re-render

  const { items, loading: loadingBanks, error: banksError, refetchItems, isUpdating } = useBankApi(null);
  const { handleSubmit, loading: formLoading } = useBankFormLogic();

  useEffect(() => {
    if (isUpdating) {
      setUpdateKey(Date.now()); // Force re-render when data is updating
      refetchItems()
    }
  }, [isUpdating]);

  useEffect(() => {
    setSelectedValue(value); // Synchronize selectedValue with prop value
  }, [value]);

  const handleSearch = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  const handleCreateAndSelect = useCallback(async () => {
    try {
      const newBank = await handleSubmit(null, { name: searchText });
      if (newBank) {
        setSelectedValue(newBank.id);
        setSearchText('');
        setUpdateKey(Date.now()); // Force re-render
        await refetchItems(); // Refresh the bank list
      }
    } catch (error) {
      console.error('Error adding bank:', error);
    }
  }, [searchText, handleSubmit, refetchItems]);

  const handleCreateAndEdit = useCallback(async () => {
    try {
      const newBank = await handleSubmit(null, { name: searchText });
      if (newBank) {
        setEditingBankId(newBank.id);
        setIsModalVisible(true);
        setSelectedValue(newBank.id);
        setUpdateKey(Date.now()); // Force re-render
        await refetchItems(); // Refresh the bank list
      }
    } catch (error) {
      console.error('Error adding bank:', error);
    }
  }, [searchText, handleSubmit, refetchItems]);

  const filterOptions = useCallback(
    (input: string, option: any) =>
      (option.children || '').toLowerCase().includes(input.toLowerCase()),
    []
  );

  const doesBankExist = useCallback(
    () => items.some(bank => 
      (bank.name || '').toLowerCase() === searchText.toLowerCase() ||
      (bank.bic || '').toLowerCase() === searchText.toLowerCase()
    ),
    [items, searchText]
  );

  return (
    <div>
      {banksError && (
        <Alert message="Error" description={banksError} type="error" showIcon />
      )}

      <Select
        key={updateKey} // Use key to force re-render
        showSearch
        loading={loadingBanks}
        value={selectedValue}
        placeholder="Select or create a bank"
        onSearch={handleSearch}
        onChange={(value) => {
          setSelectedValue(value);
          if (onChange) onChange(value);
        }}
        style={{ minWidth: 300 }}
        filterOption={filterOptions}
        dropdownRender={(menu) => (
          <>
            {menu}
            {!doesBankExist() && (
              <div
                style={{ display: 'flex', flexDirection: 'column', padding: 8 }}
              >
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
            )}
          </>
        )}
      >
        {items.map((bank) => (
          <Option key={bank.id} value={bank.id}>
            {bank.bic ? `${bank.name} - ${bank.bic}` : bank.name}
          </Option>
        ))}
      </Select>

      <Modal
        title={editingBankId ? 'Edit Bank' : 'Create Bank'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <BankForm
          bankId={editingBankId}
          onSubmitSuccess={() => {
            setIsModalVisible(false);
            setEditingBankId(null);
            setUpdateKey(Date.now()); // Force re-render
            refetchItems(); // Refresh the bank list after editing
          }}
        />
      </Modal>
    </div>
  );
};

export default BankSelect;

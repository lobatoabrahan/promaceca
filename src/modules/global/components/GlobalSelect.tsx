import React, { useState, useCallback } from 'react';
import { Select, Alert, Button } from 'antd';

interface GlobalSelectProps {
  placeholder: string;
  value?: number;
  onSelect: (value: number) => void;
  useCustomHook: () => {
    options: { label: string; value: number }[];
    loading: boolean;
    error: string | null;
    onCreate: () => Promise<number>;
    onCreateAndEdit: () => Promise<number>;
    setSearchText: (text: string) => void;
    searchText: string;
  };
  DrawerComponent: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    id: number;
    onSuccess?: () => void;
  }>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const GlobalSelect: React.FC<GlobalSelectProps> = ({
  placeholder,
  value,
  onSelect,
  useCustomHook,
  DrawerComponent,
  isDrawerOpen,
  setIsDrawerOpen,
}) => {
  const {
    options,
    loading,
    error,
    onCreate,
    onCreateAndEdit,
    setSearchText,
    searchText,
  } = useCustomHook();

  const [selectLoading, setSelectLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSearch = useCallback((value: string) => {
    setSearchText(value);
  }, [setSearchText]);

  const selectOnCreate = useCallback(async () => {
    setSelectLoading(true);
    try {
      const id = await onCreate();
      onSelect(id);
      setSelectLoading(false);
      setOpen(false);
    } catch (error) {
      console.error('Failed to create and select a new item:', error);
      setSelectLoading(false);
    }
  }, [onCreate, onSelect]);

  const selectOnCreateAndEdit = useCallback(async () => {
    setSelectLoading(true);
    try {
      const id = await onCreateAndEdit();
      setEditingId(id);
      onSelect(id);
      setSelectLoading(false);
      setOpen(false);
      setIsDrawerOpen(true);
    } catch (error) {
      console.error('Failed to create, edit, and select a new item:', error);
      setSelectLoading(false);
    }
  }, [onCreateAndEdit, onSelect, setIsDrawerOpen]);

  const handleDrawerSuccess = useCallback(() => {
    setIsDrawerOpen(false);
  }, [setIsDrawerOpen]);

  if (error) return <Alert message={error} type="error" />;

  return (
    <div>
      <Select
        open={open}
        onDropdownVisibleChange={setOpen}
        value={value}
        onChange={onSelect}
        placeholder={placeholder}
        style={{ width: '100%' }}
        showSearch
        onSearch={handleSearch}
        allowClear
        loading={loading || selectLoading}
        filterOption={(input, option) => {
          if (option && typeof option.label === 'string') {
            return option.label.toLowerCase().includes(input.toLowerCase());
          }
          return false;
        }}
        options={options}
        optionFilterProp="label"
        dropdownRender={(menu) => (
          <>
            {menu}
            <div style={{ display: 'flex', flexDirection: 'column', padding: 8 }}>
              <Button
                loading={selectLoading}
                type="link"
                onClick={selectOnCreate}
              >
                Create "{searchText}"
              </Button>
              <Button
                loading={selectLoading}
                type="link"
                onClick={selectOnCreateAndEdit}
              >
                Create and edit "{searchText}"
              </Button>
            </div>
          </>
        )}
      />

      <DrawerComponent
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        id={editingId ?? 0}
        onSuccess={handleDrawerSuccess}
      />
    </div>
  );
};

export default GlobalSelect;

import React, { useState } from 'react';
import { Select, Alert, Button } from 'antd';

interface GlobalSelectProps {
  placeholder: string;
  value?: number;
  onSelect: (value: number) => void;
  useCustomHook: () => {
    options: { label: string, value: number }[];
    loading: boolean;
    error: string | null;
    onCreate: () => Promise<number>;
    onCreateAndEdit: () => Promise<number>;
    setSearchText: (text: string) => void;
    searchText: string;
  };
}

const GlobalSelect: React.FC<GlobalSelectProps> = ({ placeholder, value, onSelect, useCustomHook }) => {
  const { options, loading, error, onCreate, onCreateAndEdit, setSearchText, searchText } = useCustomHook();
  const [selectLoading, setSelectLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const selectOnCreate = async () => {
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
  };

  const selectOnCreateAndEdit = async () => {
    setSelectLoading(true);
    try {
      const id = await onCreateAndEdit();
      onSelect(id);
      setSelectLoading(false);
      setOpen(false);
    } catch (error) {
      console.error("Failed to create and edit and select a new item:", error);
      setSelectLoading(false);
    }
  };

  if (error) return <Alert message={error} type="error" />;

  return (
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
      loading={loading}
      filterOption={(input, option) => {
        if (option && option.label) {
          return option.label.toLowerCase().includes(input.toLowerCase());
        }
        return false;
      }}
      options={options}
      optionFilterProp="label"
      dropdownRender={menu => (
        <>
          {menu}
          <div style={{ display: 'flex', flexDirection: 'column', padding: 8 }}>
            <Button loading={selectLoading} type="link" onClick={selectOnCreate}>
              Create "{searchText}"
            </Button>
            <Button loading={selectLoading} type="link" onClick={selectOnCreateAndEdit}>
              Create and edit "{searchText}"
            </Button>
          </div>
        </>
      )}
    />
  );
};

export default GlobalSelect;

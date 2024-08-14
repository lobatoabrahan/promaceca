import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Select, Button, Alert, Modal } from 'antd';

const { Option } = Select;

interface CustomSelectProps<T> {
  value?: number | string;
  onChange?: (value: number | string) => void;
  items: T[];
  loading: boolean;
  error: string | null;
  displayField: keyof T;
  keyField: keyof T;
  createItem: (name: string) => Promise<T>;
  editForm: React.FC<{ item: T | null; onSubmitSuccess: () => void }>;
  getItemDisplay: (item: T) => string;
  filterOption?: (input: string, option: any) => boolean;
  refetchItems: () => Promise<void>;
  isUpdating: boolean;
}

const CustomSelect = <T extends { [key: string]: any }>({
  value,
  onChange,
  items,
  loading,
  error,
  displayField,
  keyField,
  createItem,
  editForm: EditForm,
  getItemDisplay,
  filterOption,
  refetchItems,
  isUpdating,
}: CustomSelectProps<T>) => {
  const [searchText, setSearchText] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [selectedValue, setSelectedValue] = useState<number | string | undefined>(value);
  const [updateKey, setUpdateKey] = useState<number>(Date.now());

  const handleSearch = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  const handleCreateAndSelect = useCallback(async () => {
    try {
      const newItem = await createItem(searchText);
      if (newItem) {
        setSelectedValue(newItem[keyField]);
        setSearchText('');
        setUpdateKey(Date.now());
        await refetchItems();
        if (onChange) onChange(newItem[keyField]);
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
  }, [searchText, createItem, onChange, keyField, refetchItems]);

  const handleCreateAndEdit = useCallback(async () => {
    try {
      const newItem = await createItem(searchText);
      if (newItem) {
        setEditingItem(newItem);
        setIsModalVisible(true);
        setSelectedValue(newItem[keyField]);
        setUpdateKey(Date.now());
        await refetchItems();
        if (onChange) onChange(newItem[keyField]);
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
  }, [searchText, createItem, onChange, keyField, refetchItems]);

  const doesItemExist = useMemo(
    () => items.some(item =>
      item[displayField].toLowerCase() === searchText.toLowerCase()
    ),
    [items, searchText, displayField]
  );

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    if (isUpdating) {
      setUpdateKey(Date.now());
      refetchItems();
    }
  }, [isUpdating, refetchItems]);

  return (
    <div>
      {error && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}

      <Select
        key={updateKey}
        showSearch
        loading={loading}
        value={selectedValue}
        placeholder="Select or create an item"
        onSearch={handleSearch}
        onChange={(value) => {
          setSelectedValue(value);
          if (onChange) onChange(value);
        }}
        style={{ minWidth: 300 }}
        filterOption={filterOption}
        dropdownRender={(menu) => (
          <>
            {menu}
            {!doesItemExist && (
              <div style={{ display: 'flex', flexDirection: 'column', padding: 8 }}>
                <Button type="link" onClick={handleCreateAndSelect}>
                  Create "{searchText}"
                </Button>
                <Button type="link" onClick={handleCreateAndEdit}>
                  Create and Edit "{searchText}"
                </Button>
              </div>
            )}
          </>
        )}
      >
        {items.map((item) => (
          <Option key={item[keyField]} value={item[keyField]}>
            {getItemDisplay(item)}
          </Option>
        ))}
      </Select>

      <Modal
        title={editingItem ? 'Edit Item' : 'Create Item'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <EditForm
          item={editingItem}
          onSubmitSuccess={() => {
            setIsModalVisible(false);
            setEditingItem(null);
            setUpdateKey(Date.now());
            refetchItems();
          }}
        />
      </Modal>
    </div>
  );
};

export default CustomSelect;

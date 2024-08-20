import React, { useEffect, useState } from 'react';
import { Select, Alert, Button, SelectProps } from 'antd';
/* import { useNavigate } from 'react-router-dom';
 */
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
  DrawerComponent: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    id: number; // Para pasar el ID de la entidad que se está editando
    onSuccess?: () => void; // Función opcional para manejar el éxito
  }>;
}

const GlobalSelect: React.FC<GlobalSelectProps> = ({ placeholder, value, onSelect, useCustomHook, /* DrawerComponent */ }) => {
  const { options, loading, error, onCreate, onCreateAndEdit, setSearchText, searchText } = useCustomHook();
  const [selectLoading, setSelectLoading] = useState(false);
  const [open, setOpen] = useState(false);
/*   const navigate = useNavigate(); // Hook para la navegación
 */
/*   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
 *//*   const [editingId, setEditingId] = useState<number | null>(null);
 */  const [selectOptions, setSelectOptions] = useState<SelectProps['options']>([])

  useEffect(() => {
    setSelectOptions([...options]); // Crea una nueva referencia
  }, [options]);


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
/*       setEditingId(id);
 */      onSelect(id);
      setSelectLoading(false);
      setOpen(false);
      window.open(`/contactos/banco/${id}`, '_blank'); // Abre la URL en una nueva pestaña

/*       setIsDrawerOpen(true); // Abre el modal para edición
 */
    } catch (error) {
      console.error("Failed to create and edit and select a new item:", error);
      setSelectLoading(false);
    }
  };

  /* const handleSuccess = () => {
    setIsDrawerOpen(false);

  }; */

  if (error) return <Alert message={error} type="error" />;

  return (
    <div>
      {/* <DrawerComponent
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        id={editingId ?? 0} // Pasa el ID del banco para edición, si está definido
        onSuccess={handleSuccess}
      /> */}
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
          if (option && typeof option.label === 'string') {
            return option.label.toLowerCase().includes(input.toLowerCase());
          }
          return false;
        }}
        options={selectOptions}
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
      
    </div>
  );
};

export default GlobalSelect;

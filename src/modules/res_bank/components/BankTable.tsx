import { useState, useMemo } from 'react';
import { useBankRealtime } from '../hooks/useBankRealtime';
import { Alert, Button, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { Bank } from '../types/BankTypes';
import { useNavigate } from 'react-router-dom';

// Función para ordenar los datos con tipos seguros
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sortData = <T extends Record<string, any>>(data: T[], columnKey: keyof T | undefined, order: 'ascend' | 'descend' | undefined) => {
  if (!columnKey) return data;

  return [...data].sort((a, b) => {
    const valueA = a[columnKey];
    const valueB = b[columnKey];

    if (valueA === undefined || valueB === undefined) return 0;

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return order === 'ascend'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return order === 'ascend' ? (valueA < valueB ? -1 : 1) : (valueA > valueB ? -1 : 1);
  });
};

const BankTable = () => {
  const { banks, error, isError, isLoading } = useBankRealtime();
  const navigate = useNavigate();

  // Estado para los datos ordenados
  const [currentSorter, setCurrentSorter] = useState<{ columnKey: keyof Bank | undefined; order: 'ascend' | 'descend' | undefined }>({
    columnKey: undefined,
    order: undefined,
  });

  const sortedBanks = useMemo(() => {
    return currentSorter.columnKey && currentSorter.order
      ? sortData(banks, currentSorter.columnKey, currentSorter.order)
      : banks;
  }, [banks, currentSorter]);

  const generateFilters = (key: keyof Bank) => {
    const uniqueValues = [...new Set(banks.map(item => item[key]))].filter(value => value !== undefined && value !== null);
    return uniqueValues.map(value => ({
      text: String(value),
      value: String(value),
    }));
  };

  const columns: TableColumnsType<Bank> = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      filterMode: 'tree',
      filterSearch: true,
      filters: generateFilters('name'),
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: true,
      sortOrder: currentSorter.columnKey === 'name' ? currentSorter.order : undefined,
    },
    {
      title: 'BIC',
      dataIndex: 'bic',
      key: 'bic',
      filters: generateFilters('bic'),
      onFilter: (value, record) => record.bic?.indexOf(value as string) === 0 || false,
      sorter: true,
      sortOrder: currentSorter.columnKey === 'bic' ? currentSorter.order : undefined,
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (record) => (
        <Button type="primary" onClick={() => console.log(record)}>Ver detalles</Button>
      ),
    },
  ];

  const onChange: TableProps<Bank>['onChange'] = (_, __, sorter, extra) => {
    if (extra.action === 'sort' && sorter) {
      const sorterObj = Array.isArray(sorter) ? sorter[0] : sorter;
      const columnKey = sorterObj?.columnKey as keyof Bank | undefined;

      setCurrentSorter(prevSorter => {
        const newOrder = prevSorter.columnKey === columnKey
          ? prevSorter.order === 'ascend' ? 'descend' : (prevSorter.order === 'descend' ? undefined : 'ascend')
          : 'ascend';
        return { columnKey, order: newOrder };
      });
    }
  };

  const onRowClick = (record: Bank) => {
    navigate(`/contactos/banco/${record.id}`);
  };

  if (isError) return <Alert message={error?.message} type="error" />;

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={sortedBanks}
      loading={isLoading}
      pagination={{ pageSize: 10 }}
      onChange={onChange}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
      size='small'
      tableLayout='fixed'
    />
  );
};

export default BankTable;

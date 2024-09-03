import { useState, useMemo } from 'react';
import { useBankRealtime } from '../hooks/useBankRealtime';
import { Alert, Button, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { Bank } from '../types/BankTypes';
import { useNavigate } from 'react-router-dom';
import { sortDataByString } from '../../global/tools/sortDataByString';

const BankTable = () => {
  const { banks, banksError, banksIsError, banksIsLoading } = useBankRealtime();
  const navigate = useNavigate();

  // Estado para los datos ordenados
  const [currentSorter, setCurrentSorter] = useState<{ columnKey: keyof Bank | undefined; order: 'ascend' | 'descend' | undefined }>({
    columnKey: undefined,
    order: undefined,
  });

  const sortedBanks = useMemo(() => {
    return currentSorter.columnKey && currentSorter.order
      ? sortDataByString(banks, currentSorter.columnKey, currentSorter.order)
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

  if (banksIsError) return <Alert message={banksError?.message} type="error" />;

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={sortedBanks}
      loading={banksIsLoading}
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

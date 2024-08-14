import React, { useEffect } from 'react';
import { Table } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
import { useHierarchicalFilters } from './useHierarchicalFilters ';

interface HierarchicalTableProps<T> {
  data: T[];
  columns: ColumnsType<T>;
  rowKey: string;
  onRowClick?: (record: T) => void;
  loading:boolean
}

const HierarchicalTable = <T extends Record<string, any>>({
  data,
  columns,
  rowKey,
  onRowClick,
  loading
}: HierarchicalTableProps<T>) => {
  const { filteredData, getColumnFilters, handleTableChange } = useHierarchicalFilters(data);

  useEffect(() => {
    columns.forEach((column) => {
      if (column.dataIndex) {
        column.filters = getColumnFilters(data, column.dataIndex as keyof T);
        column.onFilter = (value, record) => record[column.dataIndex as keyof T]?.toString().startsWith(value as string);
      }
    });
  }, [data, columns, getColumnFilters]);

  const handleChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
    extra: TableCurrentDataSource<T>
  ) => {
    handleTableChange(filters, sorter, extra);
  };

  return (
    <Table
      columns={columns}
      dataSource={filteredData}
      rowKey={rowKey}
      onRow={(record) => ({
        onClick: () => onRowClick && onRowClick(record),
      })}
      pagination={{ position: ['topRight'], pageSize: 50 }}
      onChange={handleChange}
      loading={loading}
    />
  );
};

export default HierarchicalTable;

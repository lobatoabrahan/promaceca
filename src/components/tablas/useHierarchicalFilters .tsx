import { useState, useEffect } from 'react';
import { FilterValue } from 'antd/es/table/interface';

export const useHierarchicalFilters = <T extends Record<string, any>>(data: T[]) => {
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
  const [filterOrder, setFilterOrder] = useState<string[]>([]);

  useEffect(() => {
    setFilteredData(applyFilters(data, filters, filterOrder));
  }, [data, filters, filterOrder]);

  const applyFilters = (data: T[], filters: Record<string, FilterValue | null>, filterOrder: string[]): T[] => {
    let filtered = data;
    for (const key of filterOrder) {
      if (filters[key]) {
        filtered = filtered.filter((item) => {
          const value = item[key];
          if (Array.isArray(filters[key])) {
            return (filters[key] as any[]).some((filterValue) => value?.toString().startsWith(filterValue.toString()));
          }
          return value?.toString().startsWith(filters[key]?.toString());
        });
      }
    }
    return filtered;
  };

  const getColumnFilters = (data: T[], key: keyof T) => {
    const uniqueValues = Array.from(new Set(data.map((item) => item[key]?.toString())));
    return uniqueValues.map((value) => ({ text: value, value }));
  };

  const handleTableChange = (filters: Record<string, FilterValue | null>, sorter, extra) => {
    const activeFilters = Object.keys(filters).filter(key => filters[key] !== null);
    setFilterOrder(activeFilters);
    setFilters(filters);
  };

  return { filteredData, getColumnFilters, handleTableChange };
};

// src/utils/sortUtils.ts

/**
 * Ordena datos de tipo string en una columna específica.
 * 
 * @param data - Array de objetos a ordenar.
 * @param columnKey - Llave de la columna que se va a ordenar.
 * @param order - Orden de la clasificación ('ascend' o 'descend').
 * 
 * @returns - Array ordenado de objetos.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sortDataByString = <T extends Record<string, any>>(
    data: T[],
    columnKey: keyof T | undefined,
    order: 'ascend' | 'descend' | undefined
  ): T[] => {
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
  
      return 0; // Si no son strings, no se realiza la ordenación.
    });
  };
  
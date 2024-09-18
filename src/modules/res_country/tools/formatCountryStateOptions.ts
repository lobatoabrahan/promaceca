import { Country } from '../types/CountryTypes';

export const formatCountryStateOptions = (data: Country[]): { label: string; value: number }[] => {
  return data
    .filter(data => data.id !== undefined) // Filtra los bancos sin ID
    .map(data => ({
        label: data?.code ? `${data.name} - ${data.code}` : data.name,
        value: data.id as number, // Asegúrate de que el valor sea un número
    }));
};

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import BankForm from '../components/BankForm';
import { fetchBankById } from '../services/fetchBankById';
import { BankTypes } from '../types/BankTypes';

const BankEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useQuery<BankTypes | null, Error>({
    queryKey: ['bank', id],
    queryFn: () => fetchBankById(Number(id)),
    enabled: !!id, // Solo realiza la consulta si id está definido
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
      <h2>Edit Bank</h2>
      {data ? <BankForm bank={data} /> : <p>No bank data found.</p>}
    </div>
  );
};

export default BankEditPage;

// pages/BankEditPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import BankForm from '../components/BankForm';
import { fetchBankById } from '../services/fetchBankById';
import { Bank } from '../types/BankTypes';
import { useRealtimeBankById } from '../hooks/useBankRealtimeById';

const BankEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const bankId = id ? Number(id) : null;
  const { bank: realtimeBank, hasUpdates } = useRealtimeBankById(bankId);
  const [bank, setBank] = useState<Bank | null>(null);

  // Realiza la consulta inicial para obtener los datos del banco
  const { data, isLoading, isError, error } = useQuery<Bank | null, Error>({
    queryKey: ['bank', id],
    queryFn: () => fetchBankById(bankId!),
    enabled: !!id, // Solo realiza la consulta si id está definido
  });

  // Cargar datos iniciales desde el fetch
  useEffect(() => {
    if (data) {
      setBank(data);
    }
  }, [data]);

  // Actualizar datos en tiempo real
  useEffect(() => {
    if (realtimeBank) {
      setBank(realtimeBank);
    }
  }, [realtimeBank, hasUpdates]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
      <h2>Edit Bank</h2>
      {bank ? <BankForm bank={bank} /> : <p>No bank data found.</p>}
    </div>
  );
};

export default BankEditPage;

// pages/BankEditPage.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import BankForm from '../components/BankForm';
import { useBankRealtimeById } from '../hooks/useBankRealtimeById';

const BankEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const bankId = id ? Number(id) : null;
  const { bank, isLoading, isError, error } = useBankRealtimeById(bankId);

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

// components/BankFormContainer.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import BankForm from './BankForm';

interface RouteParams {
  id: string;
}

const BankFormEdit: React.FC = () => {
  const { id } = useParams<RouteParams>();

  const handleSuccess = () => {
    // Opcionalmente, puedes desencadenar una actualización u otras acciones aquí
  };

  return (
    <div style={{ padding: '24px', background: '#fff', borderRadius: '8px' }}>
      <h2>Edit Bank</h2>
      {id ? (
        <BankForm bankId={parseInt(id, 10)} onSubmitSuccess={handleSuccess} />
      ) : (
        <p>Invalid bank ID</p>
      )}
    </div>
  );
};

export default BankFormEdit;

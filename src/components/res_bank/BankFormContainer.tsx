// components/BankFormEmbedded.tsx
import React from 'react';
import BankForm from './BankForm';

const BankFormContainer: React.FC = () => {
  const handleSuccess = () => {
    // Optionally, you can trigger a refresh or other actions here
  };

  return (
    <div style={{ padding: '24px', background: '#fff', borderRadius: '8px' }}>
      <h2>Add Bank</h2>
      <BankForm bankId={null} onSubmitSuccess={handleSuccess} />
    </div>
  );
};

export default BankFormContainer;

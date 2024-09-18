// pages/BankEditPage.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { useCountryStateRealtimeById } from '../hooks/useCountryStateRealtime';
import CountryStateForm from '../components/CountryStateForm';

const CountryStateEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const bankId = id ? Number(id) : null;
  const { countryState, countryStateIsLoading, countryStateIsError, countryStateError } = useCountryStateRealtimeById(bankId);

  if (countryStateIsLoading) return <p>Loading...</p>;
  if (countryStateIsError) return <p>Error: {(countryStateError as Error).message}</p>;

  return (
    <div>
      <h2>Editar Estado</h2>
      {countryState ? <CountryStateForm data={countryState} /> : <p>No countryState data found.</p>}
    </div>
  );
};

export default CountryStateEditPage;

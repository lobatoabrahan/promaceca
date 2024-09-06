// pages/BankEditPage.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { useCountryRealtimeById } from '../hooks/useCountryRealtimeById';
import CountryForm from '../components/CountryForm';

const CountryEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const bankId = id ? Number(id) : null;
  const { country, countryIsLoading, countryIsError, countryError } = useCountryRealtimeById(bankId);

  if (countryIsLoading) return <p>Loading...</p>;
  if (countryIsError) return <p>Error: {(countryError as Error).message}</p>;

  return (
    <div>
      <h2>Edit Bank</h2>
      {country ? <CountryForm country={country} /> : <p>No country data found.</p>}
    </div>
  );
};

export default CountryEditPage;

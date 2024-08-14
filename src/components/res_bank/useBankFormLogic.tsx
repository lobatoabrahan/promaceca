import { useState } from 'react';
import { supabase } from '../../supabase/supabaseClient';
import { Bank } from '../../types';

export const useBankFormLogic = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Bank | null>(null);

  const handleSubmit = async (bankId: number | null, formData: Bank) => {
    setLoading(true); // Start loading
    setError(null); // Reset error
    try {
      // Log initial input
      console.log('Received bankId:', bankId);
      console.log('Received formData:', formData);

      if (bankId) {
        const { id, ...dataToUpdate } = formData; // Destructure to exclude id from update data
        // Update existing bank
        console.log('Updating bank with id:', bankId);
        const { data: updatedData, error: updateError } = await supabase
          .from('res_bank')
          .update(dataToUpdate) // Use the destructured data excluding id
          .eq('id', bankId)
          .select();

        if (updateError) {
          console.error('Update Error:', updateError.message);
          setError(updateError.message);
          setLoading(false); // End loading
          return null;
        }
        console.log('Bank updated successfully');
        setData(updatedData?.[0] || null); // Set updated data
        return updatedData?.[0] || null;
      } else {
        // Create new bank
        console.log('Creating new bank with data:', formData);
        const { data: newData, error: insertError } = await supabase
          .from('res_bank')
          .insert([formData])
          .select();

        if (insertError) {
          console.error('Insert Error:', insertError.message);
          setError(insertError.message);
          setLoading(false); // End loading
          return null;
        }
        console.log('Bank created successfully');
        setData(newData?.[0] || null); // Set new data
        return newData?.[0] || null;
      }
    } catch (err) {
      console.error('Unexpected Error:', err);
      setError('An unexpected error occurred');
      return null;
    } finally {
      setLoading(false); // End loading
    }
  };

  return { handleSubmit, loading, error, data };
};

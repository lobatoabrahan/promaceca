import { useCallback } from 'react';

const useOnFormSuccess = (onSuccess?: () => void) => {
  const handleOnFormSuccess = useCallback(() => {
    if (onSuccess) {
      onSuccess();
    }
  }, [onSuccess]);

  return handleOnFormSuccess;
};

export default useOnFormSuccess;

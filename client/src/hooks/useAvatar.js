import { useState, useCallback } from 'react';

export const useAvatar = () => {
  const [error] = useState(null);
  const [isLoading] = useState(false);

  const fetchAvatar = useCallback(async () => {
    return '';
  }, []);

  return {
    error,
    isLoading,
    fetchAvatar
  };
};
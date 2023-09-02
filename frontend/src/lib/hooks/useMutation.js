import { useState } from 'react';

const useMutation = ({
  apiFn,
  onError,
  onSuccess
}) => {
  const [isLoading, setisLoading] = useState(false);

  const mutate = async (data) => {
    setisLoading(true);

    try {
      const response = await apiFn(data);

      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      if (onError) {
        onError(error.response.data);
      }
    } finally {
      setisLoading(false);
    }
  }

  return {
    isLoading,
    mutate,
  };
}

export default useMutation;

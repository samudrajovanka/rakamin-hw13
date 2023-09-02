import { useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

const useFetch = ({
  apiFn,
  onSuccess,
  onError,
}) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await apiFn();

      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      if (onError) {
        onError(error.response.data);
      } else {
        toast({
          title: 'Error',
          description: 'Something went wrong!',
          status: 'error'
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [apiFn, onError, onSuccess, toast]);

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    refetch: fetchData,
  };
};

export default useFetch;

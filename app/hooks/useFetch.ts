import { useState, useEffect } from "react";
import { searchRecipes } from "../api/httpApi";
import { AxiosError } from "axios";

export const useFetch = ({
  url,
}: {
  url: string;
  params?: { query: string };
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError>();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await searchRecipes({ url });
        setData(response);
      } catch (error) {
        setError(error as AxiosError);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => {};
  }, [url]);

  return {
    loading,
    data,
    error,
  };
};

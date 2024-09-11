import { useState, useEffect } from "react";
import { searchRecipes } from "../api/httpApi";

export const useFetch = ({ url, params }: { url: string, params?: { query: string } }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await searchRecipes({ url, params });
        setData(response);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => {};
  }, [url, params]);

  return {
    loading,
    data,
    error,
  };
};

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
// import { handleAxiosError } from "./errorHandling";
import { handleAxiosError } from "./errorHandling"; // Corrected import

const useAxios = (url, method = "GET", params = {}, initialData = null) => {
  const [responseData, setResponseData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (data = null) => {
      setLoading(true);
      setError(null);

      try {
        const config = {
          method,
          url,
          params: method === "GET" ? params : undefined,
          data: method !== "GET" ? data : undefined,
        };
        const { data: response } = await axios(config);
        setResponseData(response);
      } catch (err) {
        setError(err);
        handleAxiosError(err);
      } finally {
        setLoading(false);
      }
    },
    [method, url, params]
  ); // Dependencies for fetchData

  useEffect(() => {
    if (method === "GET") {
      fetchData();
    }
  }, [fetchData]); // Only depend on fetchData

  return { responseData, loading, error, fetchData };
};

export default useAxios;

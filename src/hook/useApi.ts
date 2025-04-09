import { useState } from 'react';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HeadersInit;
  body?: any;
};

export function useApi<T = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [data, setData] = useState<T | null>(null);

  const request = async (url: string, options: RequestOptions = {}) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(url, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message);
      }

      setData(json);
      
      return json;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, request };
}

import { useState } from "react";

const HttpRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const httpReq = async (httpConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(httpConfig.url, {
        method: httpConfig.method ? httpConfig.method : "GET",
        headers: httpConfig.headers ? httpConfig.headers : {},
        body: httpConfig.body ? JSON.stringify(httpConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };
  return { httpReq: httpReq, isLoading: isLoading, error: error };
};

export default HttpRequest;

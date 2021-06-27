import React, { createContext, useState } from "react";

type LoadingContextType = {
  loading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
};

export const LoadingContext = createContext<LoadingContextType>(
  {} as LoadingContextType
);

export const LoadingContextProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);

  function showLoader(): void {
    setLoading(true);
  }

  function hideLoader(): void {
    setLoading(false);
  }

  return (
    <LoadingContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
    </LoadingContext.Provider>
  );
};

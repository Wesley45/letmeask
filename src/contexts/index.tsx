import React from "react";

import { AuthContextProvider } from "./AuthContext";
import { LoadingContextProvider } from "./LoadingContext";

const AppProvider: React.FC = ({ children }) => (
  <LoadingContextProvider>
    <AuthContextProvider>{children}</AuthContextProvider>
  </LoadingContextProvider>
);

export default AppProvider;

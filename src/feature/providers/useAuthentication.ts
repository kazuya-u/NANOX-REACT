import { useContext } from "react";
import { AuthContext, AuthContextData } from "./AuthContext";

export const useAuthentication = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthentication must be used within an AuthProvider"
    );
  }
  return context;
};

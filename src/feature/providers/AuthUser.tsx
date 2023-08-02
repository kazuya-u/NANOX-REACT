import React, { useContext, useState } from "react";
import Login from "../../pages/Login";

type AuthUserContextType = {
  user: string;
  updateContext: (newUser: string) => void;
}

const AuthUserContext = React.createContext<AuthUserContextType>({
  user: "",
  updateContext: () => {},
});

export const useAuthUserContext = ():AuthUserContextType => {
  return useContext<AuthUserContextType>(AuthUserContext);
}

type Props = {
  children: React.ReactNode
}

export const AuthUserProvider = (props: Props) => {
  const [user, setUser] = useState<string>("");
  const updateContext = (newUser: string) => {
    setUser(newUser);
  }
  
  const value:AuthUserContextType = { user, updateContext };
  if (!user) {
    return <Login />;
  }
  else {
    return (
      <AuthUserContext.Provider value={value}>
        {props.children}
      </AuthUserContext.Provider>
    );
  }
}

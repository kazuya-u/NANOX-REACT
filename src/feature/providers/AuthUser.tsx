import React from "react";
import Login from "../../pages/Login";

export type AuthUserContextType = {
  user: string;
  updateContext: (newUser: string) => void;
}

const AuthUserContext = React.createContext<AuthUserContextType>({
  user: "",
  updateContext: () => {},
});

export const useAuthUserContext = ():AuthUserContextType => {
  return React.useContext<AuthUserContextType>(AuthUserContext);
}

type Props = {
  children: React.ReactNode
}

export const AuthUserProvider = (props: Props) => {
  const [user, setUser] = React.useState<string>("");
  const updateContext = (newUser: string) => {
    setUser(newUser);
  }
  console.log(setUser);
  
  const value:AuthUserContextType = { user, updateContext };
  console.log(user, 'hoge');
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

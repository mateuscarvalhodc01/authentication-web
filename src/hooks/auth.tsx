import React, { createContext, useContext, useEffect, useState } from 'react';
import IUser from '~/models/user';

interface IAuthContext {
  token: string | null;
  setToken: (token: string) => void;
  user: IUser;
  setUser: (user: IUser) => void;
  signOut: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const useAuth = (): IAuthContext => useContext(AuthContext);

const AuthComponent: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    const sessionStorageToken = sessionStorage.getItem(
      '@AUTHENTICATION:JWT_TOKEN',
    );
    return sessionStorageToken ?? null;
  });

  const [user, setUser] = useState<IUser>(() => {
    const sessionStorageUser = sessionStorage.getItem('@AUTHENTICATION:USER');
    return sessionStorageUser ? JSON.parse(sessionStorageUser) : null;
  });

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('@AUTHENTICATION:JWT_TOKEN', token);
    }
  }, [token]);

  const signOut = () => {
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthComponent, useAuth };

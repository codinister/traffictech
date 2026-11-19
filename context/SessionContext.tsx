import { useContext, createContext, useState } from 'react';
import type { Users } from '../types/schemaType';

type contextType = {
  isLogin: boolean;
  userdata: string;
  loginSession: (data: Users[]) => void;
  logout: () => void;
};
const context = createContext({} as contextType);

export const Session = () => useContext(context);

export const SessionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userdata, setUsers] = useState('');

  const loginSession = (data: Users[]) => {
    if (data) {
      if (!sessionStorage.getItem('users')) {
        sessionStorage.setItem('login', 'true');
        sessionStorage.setItem('users', JSON.stringify(data));
      }

      const users = sessionStorage.getItem('users');

      if (users) {
        setUsers(users);
        setIsLogin(true);
      }
    }
  };

  const logout = () => {
    
      sessionStorage.removeItem('login');
      sessionStorage.removeItem('users');
      setUsers('');
      setIsLogin(false);
    
  };

  return (
    <context.Provider value={{ isLogin, userdata, loginSession, logout }}>
      {children}
    </context.Provider>
  );
};

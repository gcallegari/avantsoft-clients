import React, { useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<{ email: string } | null>(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    return token && email ? { email } : null;
  });

  const login = (email: string, password: string) => {
    if (!email || !password) throw new Error('Credenciais inválidas');
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('email', email);
    setUser({ email });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

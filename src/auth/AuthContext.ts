import { createContext } from 'react';

export interface AuthState {
    user: { email: string } | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthState | null>(null);

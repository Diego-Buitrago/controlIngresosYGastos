import { createContext } from 'react';

interface ContextProps {    
    isLoggedIn: boolean;
    toke?: string;

    //  Methos
    loginUser: (user: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);
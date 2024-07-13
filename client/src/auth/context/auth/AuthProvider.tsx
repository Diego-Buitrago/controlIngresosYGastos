import { FC, useEffect, useReducer, useState } from 'react';
import { AuthContext, authReducer } from './';
import { axiosApi } from '../../../api/axiosApi';
import { LoginForm } from '../../../notAuth/interfaces/forms';
import {Spinner} from "@nextui-org/react";
// UTILS
import { AxiosError, toastApiError } from '../../../plugins/reactToastify';

export interface AuthState {
    isLoggedIn: boolean;
    token?: string;
    profile?: number;
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

const Auth_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    token: undefined,
    profile: undefined
}

export const AuthProvider: FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);
    const [validating, setValidating] = useState(true);

    useEffect(() => {
        checkToken(); 
        //eslint-disable-next-line   
    }, []);

    const checkToken = async() => {
        if (!localStorage.getItem('tokenGastos')) return setValidating(false);

        try {
            const { data } = await axiosApi.get('validate_token');
            const { token, profile } = data;
            dispatch({ type: 'Auth - Login', payload: { token, profile} });
            setValidating(false);
            return true;
        } catch (error) {
            console.log('error', error);
            logout();
            setValidating(false);
            toastApiError(error as AxiosError);
            return false;
        }
    }

    if (validating) return (<div className="flex items-center justify-center min-h-screen"><Spinner size="lg" /></div>)

    const loginUser = async(user: string, password: string): Promise<boolean> => {
        const params = { user, password } as LoginForm;
        try {
            const { data } = await axiosApi.post('/start_section', params);
            const { token, profile } = data;
          
            localStorage.setItem("tokenGastos", token);
            dispatch({ type: 'Auth - Login', payload: { token, profile} });
            return true;

        } catch (error) {
            console.log('error', error);
            toastApiError(error as AxiosError);
            return false
        }
    }

    const logout = () => {
        dispatch({ type: 'Auth - Logout' });
        window.localStorage.removeItem('tokenGastos');
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methos
            loginUser,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}

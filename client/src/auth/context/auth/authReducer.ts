import { AuthState } from './';

type AuthActionType =
   | { type: 'Auth - Login', payload: { token: string, profile: number } }
   | { type: 'Auth - Logout' }

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {

    switch (action.type) {
        case 'Auth - Login':
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
                profile: action.payload.profile
            }

        case 'Auth - Logout':
            return {
                ...state,
                isLoggedIn: false,
                token: undefined,
                profile: undefined
            }

        default:
            return state
    }
}
import jwtDecode from 'jwt-decode';
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

import api from '../services/api';
import { getUnixTime } from 'date-fns';

interface User {
    sub: string;
    name: string;
    username: string;
    authorities: any;
}
interface AuthState {
    token: string;
    user: User;
}
interface SignInCredentials {
    username: string;
    password: string;
}
interface AuthContextData {
    user: User;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
    updateUser(user: User): void;
}

type Props = { children: React.ReactNode };

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData,
);

export const AuthProvider: React.FC<Props> = ({ children }) => {
    useEffect(() => {
        const token = localStorage.getItem('@CORELAB:token');
        auxSetToken(token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }, []);

    const auxSetToken = async (token: any) => {
        if (token) {
            const user: User = await jwtDecode(token);
            setData({ user, token: token });
        }
    };

    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@CORELAB:token');
        if (token) {
            const user: User = jwtDecode(token);
            if (user) {
                api.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${token}`;
                return { token, user: user };
            }
        }
        return {} as AuthState;
    });

    const signIn = async ({ username, password }: SignInCredentials) => {
        const response = await api.post('login', {
            username,
            password,
        });
        const { token } = response.data;
        const user: User = jwtDecode(token);
        localStorage.setItem('@CORELAB:token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setData({ token, user });
    };

    const signOut = useCallback(() => {
        localStorage.removeItem('@CORELAB:token');
        localStorage.removeItem('@CORELAB:refreshToken');
        localStorage.removeItem('@CORELAB:openCollapsePermissions');
        setData({} as AuthState);
    }, []);

    const updateUser = useCallback(
        (user: User) => {
            localStorage.setItem('@CORELAB:user', JSON.stringify(user));
            setData({
                token: data.token,
                user,
            });
        },
        [setData, data.token],
    );

    return (
        <AuthContext.Provider
            value={{
                user: data.user,
                signIn,
                signOut,
                updateUser,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    return context;
}

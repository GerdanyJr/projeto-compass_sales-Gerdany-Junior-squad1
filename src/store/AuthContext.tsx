import React, { ReactNode, createContext, useState } from "react";
import { User } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { emailPasswordLogout } from "../util/http/auth";

export const AuthContext = createContext({
    token: '',
    user: null as User | null,
    isAuthenticated: false,
    authenticate: (user: User, token: string) => { },
    logout: () => { }
});

interface AuthContextProviderProps {
    children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [token, setToken] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);

    function authenticate(user: User, token: string) {
        setToken(token);
        setUser(user);
        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('user', JSON.stringify(user));
    }

    function logout() {
        setToken('');
        setUser(null);
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('user');
        emailPasswordLogout();
    }

    const value = {
        token: token,
        user: user,
        isAuthenticated: !!token,
        authenticate: authenticate,
        logout: logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

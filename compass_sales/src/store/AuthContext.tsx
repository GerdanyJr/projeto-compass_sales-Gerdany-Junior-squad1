import React, { ReactNode, createContext, useState } from "react";
import { User } from "firebase/auth";

export const AuthContext = createContext({
    token: '',
    user: null as User | null,
    isAuthenticated: false,
    authenticate: (token: string) => { },
    logout: () => { }
});

interface AuthContextProviderProps {
    children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [token, setToken] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);

    function authenticate(response: any) {
        setToken(response.idToken);
        setUser(response);
    }

    function logout() {
        setToken('');
        logout();
        setUser(null);
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

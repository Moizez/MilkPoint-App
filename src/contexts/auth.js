import React, { useState, createContext } from 'react';
import { View } from 'react-native';

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {

    //Se existir qualquer usuario diferente de "null", ele loga
    const [user, setUser] = useState({user: 'Moisés'})

    return (
        <AuthContext.Provider value={{ logged: !!user, user }}>
            {children}
        </AuthContext.Provider>
    );
}
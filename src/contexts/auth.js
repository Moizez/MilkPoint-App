import React, { useState, useEffect, createContext } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {

    //Se existir qualquer usuario diferente de "null", ele loga
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingAuth, setLoadingAuth] = useState(false)

    //Carregar usuário do AsyncStorage
    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('Auth_user')

            if (storageUser) {
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }

            setLoading(false)
        }

        loadStorage()
    }, [])

    //Funcao para logar o usuário
    async function signIn(email, password) {
        setLoadingAuth(true)

        if (email.trim().length == 0 || password.trim().length == 0) {
            alert('Preencha seu e-mail e senha corretamente!')
            setLoadingAuth(false)
            return
        } else {

            const dado = {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                credentials: 'same-origin',
                mode: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': 'csrftoken'
                }
            }

            const response = await fetch('https://milkpoint.herokuapp.com/api/login', dado)
            const data = await response.json()

            alert(data.perfil)

            try {
                if (response.status == 200) {
                    setUser(data)
                    storageUser(data)
                    setLoadingAuth(false)
                } else {
                    alert(response.status)
                    setLoadingAuth(false)
                }

            }
            catch (erro) {
                alert('Erro ao tentar fazer login: ' + erro)
                setLoadingAuth(false)
            }
        }
    }

    //Função para logar o usario
    async function logOut() {
        await AsyncStorage.clear()
            .then(() => {
                setUser(null)
            })
    }

    async function storageUser(data) {
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data))
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, loadingAuth, signIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}

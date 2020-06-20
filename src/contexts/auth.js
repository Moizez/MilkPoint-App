import React, { useState, useEffect, createContext } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {

    //Url padrão da API
    const baseURL = 'https://milkpoint.herokuapp.com/api/'

    //Estados do Active Indicator
    const [loading, setLoading] = useState(true)
    const [loadingAuth, setLoadingAuth] = useState(false)

    //Estados do usuário
    const [user, setUser] = useState(null)

    //Carregar usuário do AsyncStorage
    useEffect(() => {
        const loadStorage = async () => {
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
    const signIn = async (email, password) => {
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

    //Função para deslogar o usuário
    const logOut = async () => {
        await AsyncStorage.clear()
            .then(() => {
                setUser(null)
            })
    }

    //Função para adicionar o usuário no Async Storage
    const storageUser = async (data) => {
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data))
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user, user, loading, loadingAuth,
            signIn, logOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}


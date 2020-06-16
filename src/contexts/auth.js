import React, { useState, useEffect, createContext } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {

    //Estados do Active Indicator
    const [loading, setLoading] = useState(true)
    const [loadingAuth, setLoadingAuth] = useState(false)

    //Se existir qualquer usuario diferente de "null", ele loga
    const [user, setUser] = useState(null)
    const [tanque, setTanque] = useState([])
    const [deposito, setDeposito] = useState([])
    const [retirada, setRetirada] = useState([])
    const [depositoPendente, setDepositoPendente] = useState([])
    const [retiradaPendente, setRetiradaPendente] = useState([])


    //Lista de Depositos
    useEffect(() => {
        async function loadListDepositos() {
            const response = await fetch('https://milkpoint.herokuapp.com/api/deposito/listatodos')
            const deposito = await response.json()
            setDeposito(deposito)
        }

        loadListDepositos()

    }, [])

    //Lista de Depositos Pendentes
    useEffect(() => {
        async function loadListDepositosPendentes() {
            const response = await fetch('https://milkpoint.herokuapp.com/api/deposito/listapendentes')
            const depositoPendente = await response.json()
            setDepositoPendente(depositoPendente)
        }

        loadListDepositosPendentes()

    }, [])

    //Lista de Retiradas
    useEffect(() => {
        async function loadListRetiradas() {
            const response = await fetch('https://milkpoint.herokuapp.com/api/retirada/listatodos')
            const retirada = await response.json()
            setRetirada(retirada)
        }

        loadListRetiradas()

    }, [])

    //Lista de Retiradas Pendentes
    useEffect(() => {
        async function loadListRetiradasPendentes() {
            const response = await fetch('https://milkpoint.herokuapp.com/api/retirada/listapendentes')
            const retiradaPendente = await response.json()
            setRetiradaPendente(retiradaPendente)
        }

        loadListRetiradasPendentes()

    }, [])

    //Carregar lista tanque para o Context
    useEffect(() => {
        async function loadListTanques() {
            const response = await fetch('https://milkpoint.herokuapp.com/api/tanque')
            const tanque = await response.json()
            setTanque(tanque)
        }

        loadListTanques()

    }, [])


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
    async function logOut() {
        await AsyncStorage.clear()
            .then(() => {
                setUser(null)
            })
    }

    //Função para adicionar o usuário no Async Storage
    async function storageUser(data) {
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data))
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user, user, tanque, deposito, retirada, depositoPendente, retiradaPendente,
            loading, loadingAuth, signIn, logOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}

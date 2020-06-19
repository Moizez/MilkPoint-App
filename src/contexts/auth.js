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

    //States 
    const [user, setUser] = useState(null)
    const [tanque, setTanque] = useState([])
    const [deposito, setDeposito] = useState([])
    const [retirada, setRetirada] = useState([])
    const [depositoPendente, setDepositoPendente] = useState([])
    const [retiradaPendente, setRetiradaPendente] = useState([])
    const [tanqueResponsavel, setTanqueResponsavel] = useState([])

    //Solicitação de depósito pelo produtor
    const requestDeposito = async (quantidade, idProd, idTanque) => {
        const data = new FormData();
        data.append("quantidade", quantidade);
        data.append("idProd", idProd);
        data.append("idTanque", idTanque);

        const apiCall = await fetch('https://milkpoint.herokuapp.com/api/deposito', {
            method: 'POST', body: data
        })

        if (idProd === undefined) {
            alert('Erro ao processar o pedido!')
        } else {
            alert("Depósito realizado com sucesso!" + "\n" + "Aguarde a confirmação!")
        }
    };

    //Confirmação da retiradas pelo responsável
    const confirmacaoRetirada = async (confirmacao, idRetirada) => {
        const data = new FormData();
        data.append("confirmacao", confirmacao);
        data.append("idRetirada", idRetirada);

        const apiCall = await fetch(
            'https://milkpoint.herokuapp.com/api/retirada/confirmacao', { method: 'POST', body: data })

        const response = await apiCall.json();

        if (confirmacao) {
            alert("Pedido confirmado com sucesso!" + "\n" + "Veja sempre a quantidade restante!")
        }
        else {
            alert("Pedido cancelado com sucesso!" + "\n" + "Veja sempre a quantidade restante!")
        }

        loadListRetiradasPendentes()
    };

    //Confirmação da depositos pelo responsável
    const confirmacaoDeposito = async (confirmacao, idDeposito) => {
        const data = new FormData();
        data.append("confirmacao", confirmacao);
        data.append("idDeposito", idDeposito);

        const apiCall = await fetch(
            'https://milkpoint.herokuapp.com/api/deposito/confirmacao', { method: 'POST', body: data })

        const response = await apiCall.json();

        if (confirmacao) {
            alert("Pedido confirmado com sucesso!" + "\n" + "Veja sempre a quantidade restante!")
        }
        else {
            alert("Pedido cancelado com sucesso!" + "\n" + "Veja sempre a quantidade restante!")
        }

        loadListDepositosPendentes()
    };


    //Lista de todos os depositos
    useEffect(() => {
        const loadListDepositos = async () => {
            const response = await fetch(baseURL + 'deposito/listatodos')
            const deposito = await response.json()
            setDeposito(deposito)
        }

        loadListDepositos()

    }, [...deposito])

    //Lista de Depositos Pendentes
    useEffect(() => {
        const loadListDepositosPendentes = async () => {
            const response = await fetch(baseURL + 'deposito/listapendentes')
            const depositoPendente = await response.json()
            setDepositoPendente(depositoPendente)
        }

        loadListDepositosPendentes()

    }, [...depositoPendente])

    //Lista de Retiradas
    useEffect(() => {
        const loadListRetiradas = async () => {
            const response = await fetch(baseURL + 'retirada/listatodos')
            const retirada = await response.json()
            setRetirada(retirada)
        }

        loadListRetiradas()

    }, [...retirada])

    //Lista de Retiradas Pendentes
    useEffect(() => {
        const loadListRetiradasPendentes = async () => {
            const response = await fetch(baseURL + 'retirada/listapendentes')
            const retiradaPendente = await response.json()
            setRetiradaPendente(retiradaPendente)
        }

        loadListRetiradasPendentes()

    }, [...retiradaPendente])

    //Carregar lista tanque para o Context
    useEffect(() => {
        const loadListTanques = async () => {
            const response = await fetch(baseURL + 'tanque')
            const tanque = await response.json()
            setTanque(tanque)
        }

        loadListTanques()

    }, [...tanque])

    //Carregar lista apens dos responsaveis logados e seus tanques
    useEffect(() => {
        const loadListTanquesResponsavel = async () => {
            const storageUser = await AsyncStorage.getItem('Auth_user')
            setUser(JSON.parse(storageUser))
            const response = await fetch(baseURL + 'responsavel/' + user.id + '/tanques')
            const tanqueResponsavel = await response.json()
            setTanqueResponsavel(tanqueResponsavel)
        }

        loadListTanquesResponsavel()

    }, [...tanqueResponsavel])

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
                    id: id,
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
            signed: !!user, user, tanque, deposito, retirada, depositoPendente, retiradaPendente,
            tanqueResponsavel, loading, loadingAuth, signIn, logOut, confirmacaoRetirada, confirmacaoDeposito,
            requestDeposito
        }}>
            {children}
        </AuthContext.Provider>
    );
}


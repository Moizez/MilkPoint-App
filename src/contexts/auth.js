import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { Modal } from 'react-native'

import AlertErrorSuccess from '../components/AlertErrorSuccess'
import LoadScreen from '../components/LoadScreen'
import api from '../services/api'

export const AuthContext = createContext({})

//Url padrão da API 
//let baseUrl = 'http://192.168.0.129:8080/api/'
let baseUrl = 'https://milkpoint.herokuapp.com/api/'
//let baseUrl = 'https://milkpointapi.cfapps.io/api/'
let cepUrl = 'https://viacep.com.br/ws/'

export default function AuthProvider({ children }) {

    let error = require('../assets/lottie/error-icon.json')
    const [errorMsg, setErrorMsg] = useState('')

    const [loading, setLoading] = useState(true)
    const [loadingPages, setLoadingPages] = useState(true)
    const [isVisible, setVisible] = useState(false)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [depositoPendente, setDepositoPendente] = useState([])
    const [depositoResolvido, setDepositoResolvido] = useState([])
    const [deposito, setDeposito] = useState([])
    const [retiradaPendente, setRetiradaPendente] = useState([])
    const [retiradaResolvida, setRetiradaResolvida] = useState([])
    const [retirada, setRetirada] = useState([])
    const [user, setUser] = useState(null)
    const [tanque, setTanque] = useState([])
    const [tanqueResponsavel, setTanqueResponsavel] = useState([])
    const [time, setTime] = useState(false)

    //Perfis
    const [produtor, setProdutor] = useState([])
    const [laticinio, setLaticinio] = useState([])
    const [responsavel, setResponsavel] = useState([])

    //Carregar lista de produtores
    const loadListProdutores = async () => {
        const response = await api.get('produtor')
        setProdutor(response.data)

        return produtor
    }

    //Carregar lista de laticinios
    const loadListLaticinios = async () => {
        const response = await api.get('laticinio')
        setLaticinio(response.data)

        return laticinio
    }

    //Carregar lista de responsaveis
    const loadListResponsaveis = async () => {
        const response = await api.get('responsavel')
        setResponsavel(response.data)

        return responsavel
    }

    //Carregar lista de tanques 
    const loadListTanques = async () => {
        const response = await api.get('tanque')
        setTanque(response.data)

        return tanque
    }

    //Retona uma lista apenas com os tanques do responsável logado
    const loadListTanquesResponsavel = async () => {
        setLoadingPages(true)
        const response = await api.get(`responsavel/${user.id}/tanque`)
        setTanqueResponsavel(response.data)
        setLoadingPages(false)

        return tanqueResponsavel
    }

    //Lista de depositos pendentes
    const loadListDepositosPendentes = async () => {
        setLoadingPages(true)
        const response = await api.get('deposito/listapendentes')
        setDepositoPendente(response.data)
        setLoadingPages(false)

        return depositoPendente
    }

    //Lista de todos os depositos
    const loadListDepositos = async () => {
        const response = await api.get('deposito/listatodos')
        setDeposito(response.data)

        return deposito
    }

    //Lista de todos os depositos excluidos ou confirmados
    const loadListDepositosResolvidos = async () => {
        setLoadingPages(true)
        const response = await api.get('deposito/resolvidos')
        setDepositoResolvido(response.data)
        setLoadingPages(false)

        return depositoResolvido
    }

    //Lista de retiradas pendentes
    const loadListRetiradasPendentes = async () => {
        setLoadingPages(true)
        const response = await api.get('retirada/listapendentes')
        setRetiradaPendente(response.data)
        setLoadingPages(false)

        return retiradaPendente
    }

    //Lista de todos os retiradas
    const loadListRetiradas = async () => {
        const response = await api.get('retirada/listatodos')
        setRetirada(response.data)

        return retirada
    }

    //Lista de todos os depositos excluidos ou confirmados
    const loadListRetiradasResolvidas = async () => {
        const response = await api.get('retirada/resolvidos')
        setRetiradaResolvida(response.data)

        return retiradaResolvida
    }

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

    //Alertas de erro
    const correctLogin = () => {
        if (isVisible) {
            return (
                <AlertErrorSuccess
                    onClose={closeAlertErroSuccess}
                    title='Aviso'
                    message={errorMsg}
                    titleButton='Ok'
                    jsonPath={error}
                    buttonColor={'#292b2c'}
                />
            )
        }
    }

    const closeAlertErroSuccess = () => { setVisible(false) }

    //Funcao para logar o usuário
    const signIn = async (email, password) => {
        setLoadingAuth(true)
        if (email.trim().length == 0 || password.trim().length == 0) {
            setErrorMsg('Preencha seu e-mail ou senha corretamente!')
            setVisible(true)
            correctLogin()
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

            const response = await fetch(`${baseUrl}login`, dado)

            try {
                if (response.status == 200) {
                    const data = await response.json()
                    setUser(data)
                    storageUser(data)
                    setLoadingAuth(false)
                    return
                } else {
                    setErrorMsg('E-mail ou senha inválidos! Tente novamente.')
                    setVisible(true)
                    correctLogin()
                    setLoadingAuth(false)
                    return
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
        setTime(true)
        await AsyncStorage.removeItem('Auth_user')
            .then(() => {
                setTimeout(() => {
                    setUser(null)
                    setTime(false)
                }, 2000);
            })
    }

    //Função para adicionar o usuário no Async Storage
    const storageUser = async (data) => {
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data))
    }

    return (

        <>
            <Modal
                animationType='fade'
                transparent={false}
                visible={time}
            >
                <LoadScreen msg='SAINDO' />

            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={isVisible}
            >
                {correctLogin()}
            </Modal>

            <AuthContext.Provider value={{
                signed: !!user, user, loading, loadingPages, loadingAuth, depositoPendente, deposito, retiradaPendente,
                retirada, tanque, tanqueResponsavel, baseUrl, cepUrl, produtor, laticinio, responsavel,
                depositoResolvido, retiradaResolvida,
                signIn, logOut, loadListDepositosPendentes, loadListDepositos, loadListRetiradasPendentes,
                loadListRetiradas, loadListTanques, loadListTanquesResponsavel, loadListProdutores,
                loadListLaticinios, loadListResponsaveis, loadListDepositosResolvidos, loadListRetiradasResolvidas
            }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}


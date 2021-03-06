import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { Modal } from 'react-native'

import AlertErrorSuccess from '../components/AlertErrorSuccess'
import LoadScreen from '../components/LoadScreen'

import Api from '../services/api'
import ProducerApi from '../services/producer.api'

export const AuthContext = createContext({})

let baseUrl = 'https://milkpoint.serviceapp.net.br/api/' //Leandro
let cepUrl = 'https://viacep.com.br/ws/'

const AuthProvider = ({ children }) => {

    let error = require('../assets/lottie/error-icon.json')
    const [errorMsg, setErrorMsg] = useState('')

    const [loading, setLoading] = useState(true)
    const [isVisible, setVisible] = useState(false)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [user, setUser] = useState(null)
    const [time, setTime] = useState(false)
    const [pendingDepositsList, setPendingDepositsList] = useState([])

    const loadPendingDepositsProducer = async () => {
        const response = await ProducerApi.getPendingDepositsProducer()
        setPendingDepositsList(response)
    }

    //Carregar usuário do AsyncStorage
    useEffect(() => {
        const loadStorage = async () => {
            const storageUser = await AsyncStorage.getItem('@milkpoint:user')
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

            let response = await Api.onSignIn(email, password)

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
        await AsyncStorage.removeItem('@milkpoint:user')
            .then(() => {
                setTimeout(() => {
                    setUser(null)
                    setTime(false)
                }, 2000);
            })
    }

    //Função para adicionar o usuário no Async Storage
    const storageUser = async (data) => {
        await AsyncStorage.setItem('@milkpoint:user', JSON.stringify(data))
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
                signed: !!user, user, loading, loadingAuth, pendingDepositsList,
                signIn, logOut, loadPendingDepositsProducer
            }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export default AuthProvider


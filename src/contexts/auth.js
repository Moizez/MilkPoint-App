import React, { useState, useEffect, createContext, Fragment } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { Modal } from 'react-native'

import WarningModal from '../components/Modals/WarningModal'
import LoadScreen from '../components/LoadScreen'

import Api from '../services/api'

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')

    const [user, setUser] = useState(null)
    const [time, setTime] = useState(false)

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

    const openWarningModal = () => setWarningModal(true)
    const closeWarningModal = () => setWarningModal(false)

    //Funcao para logar o usuário
    const signIn = async (email, password) => {
        setLoadingAuth(true)
        if (email.length == 0 || password.length == 0) {
            setTypeMessage('Preencha seu e-mail ou senha corretamente!')
            openWarningModal()
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
                    setTypeMessage('E-mail ou senha inválido!\nTente novamente.')
                    openWarningModal()
                    setLoadingAuth(false)
                    return
                }
            }
            catch (erro) {
                setTypeMessage(`Erro ao tentar fazer login:\n${erro}`)
                openWarningModal()
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

        <Fragment>
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
                visible={warningModal}
            >
                <WarningModal
                    closeModal={closeWarningModal}
                    lottie={require('../assets/lottie/error-icon.json')}
                    message={typeMessage}
                />
            </Modal>

            <AuthContext.Provider value={{
                signed: !!user, user,
                loading, loadingAuth,
                signIn, logOut
            }}>
                {children}
            </AuthContext.Provider>
        </Fragment>
    )
}

export default AuthProvider


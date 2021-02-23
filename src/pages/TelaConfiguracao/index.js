import React, { useState, useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import LottieView from 'lottie-react-native'

import { AuthContext } from '../../contexts/auth'
import AlertSimpleInfo from '../../components/AlertSimpleInfo'

export default function TelaConfiguracao() {
    const { logOut } = useContext(AuthContext)
    const [isAlertInfo, setAlertInfo] = useState(false)

    const showInformationAlert = () => {
        if (isAlertInfo) {
            return (
                <AlertSimpleInfo
                    onConfirm={handleConfirm}
                    onClose={closeAlertInfo}
                    title='Aviso'
                    message={'Deseja realmente sair?'}
                />
            )
        }
    }

    const handleLogout = () => { setAlertInfo(true) }

    const handleConfirm = () => {
        setAlertInfo(false)
        logOut()
    }

    const closeAlertInfo = () => setAlertInfo(false)

    return (
        <View style={styles.container}>

            <Modal
                animationType='fade'
                transparent={true}
                visible={isAlertInfo}
            >
                {showInformationAlert()}
            </Modal>

            <View style={styles.header}>
                <Text style={styles.title}>Informações</Text>
            </View>

            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.item}>
                    <Icon name='bell' color={'#292b2c'} size={35} />
                    <Text style={styles.text}>Notificações</Text>
                </TouchableOpacity>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd' }}></View>

                <TouchableOpacity style={styles.item}>
                    <Icon name='help-circle' color={'#292b2c'} size={35} />
                    <Text style={styles.text}>Perguntas frequentes</Text>
                </TouchableOpacity>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd' }}></View>

                <TouchableOpacity style={styles.item}>
                    <Icon name='cellphone' color={'#292b2c'} size={35} />
                    <Text style={styles.text}>Contatos</Text>
                </TouchableOpacity>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd' }}></View>

                <TouchableOpacity style={styles.item}>
                    <Icon name='shield-lock' color={'#292b2c'} size={35} />
                    <Text style={styles.text}>Política de privacidade</Text>
                </TouchableOpacity>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd' }}></View>

                <TouchableOpacity style={styles.item}>
                    <Icon name='star' color={'#292b2c'} size={35} />
                    <Text style={styles.text}>Avaliar aplicativo</Text>
                </TouchableOpacity>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd' }}></View>

                <TouchableOpacity style={styles.item} onPress={() => handleLogout()}>
                    <Icon name='exit-to-app' color={'#da1e37'} size={35} />
                    <Text style={styles.text}>Sair</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.versionContainer}>
                <Text>Milk Point</Text>
                <Text style={{ color: '#adb5bd' }}>Versão 2020.11.15</Text>
            </View>
            <LottieView style={{ height: 48, marginTop: 2 }} source={require('../../assets/lottie/farm-icon.json')} autoPlay loop />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 0.2,
        backgroundColor: '#292b2c',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        color: '#FFF',

    },
    itemContainer: {
        flex: 1,
        margin: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    text: {
        fontSize: 17,
        marginLeft: 15,
    },
    versionContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
})
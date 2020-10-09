import React, { useState, useContext, useEffect } from 'react'
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import GraficoTanque from '../../../components/GraficoTanque'
import AlertSimpleInfo from '../../../components/AlertSimpleInfo'
import AlertErrorSuccess from '../../../components/AlertErrorSuccess'
import Map from '../../../components/Map'
import { AuthContext } from '../../../contexts/auth'
import ModalUpdateTanque from '../../../components/ModalUpdateTanque'

export default function ListaTanques({ data }) {

    const { baseUrl, loadListDepositosPendentes, loadListTanques, depositoPendente, retiradaPendente } = useContext(AuthContext)

    const [modalVisible, setModalVisible] = useState(false)
    const [isAlertInfo, setAlertInfo] = useState(false)
    const [idTanque, setIdTanque] = useState(data.id)
    const [modalUpdate, setModalUpdate] = useState(false)
    const [alertVisible, setAlertVisible] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [jsonIcon, setJsonIcon] = useState('error')

    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')
    let msgType = jsonIcon == 'error' ? error : success

    //Função para deletar um tanque
    const deleteTanque = async (idTanque) => {

        const headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append("Accept", 'application/json')

        const data = { id: idTanque }

        await fetch(`${baseUrl}tanque/${idTanque}`,
            {
                method: 'DELETE',
                headers: headers,
                body: JSON.stringify(data)
            })
    }

    const idTanqueAtual = i => i.tanque.id == data.id
    const selectedTanque = depositoPendente.filter(idTanqueAtual)

    useEffect(() => {
        loadListDepositosPendentes()
    }, [])

    const handleDelete = async () => {
        if (selectedTanque.length > 0) {
            setJsonIcon('error')
            setErrorMsg('Existem depósitos pendentes para este tanque!')
            setAlertVisible(true)
        } else {
            setAlertInfo(true)
        }
    }

    const handleConfirm = async () => {
        setIdTanque(data.id)
        await deleteTanque(idTanque)
        await loadListTanques()
    }

    const handleCloseModal = () => setModalVisible(false)
    const handleOpenModal = () => setModalVisible(true)
    const closeAlertInfo = () => setAlertInfo(false)
    const closeModal = () => setModalUpdate(false)
    const closeAlertErroSuccess = () => setAlertVisible(false)
    const showAlertErroSuccess = () => {
        setErrorMsg('Tanque atualizado com sucesso!')
        setAlertVisible(true)
    }

    const leftActions = () => {
        return (
            <TouchableOpacity onPress={() => setModalUpdate(true)} style={styles.actions}>
                <Icon name='pencil' size={25} color={'#FFF'} />
                <Text style={styles.actionText}>Editar</Text>
            </TouchableOpacity>
        )
    }

    const rightActions = () => {
        return (
            <TouchableOpacity onPress={() => handleDelete()} style={{ ...styles.actions, backgroundColor: '#da1e37' }}>
                <Icon name='delete' size={25} color={'#FFF'} />
                <Text style={styles.actionText}>Excluir</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Swipeable
                renderLeftActions={leftActions}
                renderRightActions={rightActions}
            >
                <View style={styles.cardContainer} activeOpacity={0.7}>
                    <View style={styles.infoCard}>
                        <Text style={styles.textInfo}>Tanque: <Text style={styles.text}>{data.nome}</Text></Text>
                        <Text style={styles.textInfo}>Tipo do leite: <Text style={styles.text}>{data.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</Text></Text>
                        <Text style={styles.textInfo}>Vol. atual: <Text style={styles.text}>{data.qtdAtual} litros</Text></Text>
                        <Text style={styles.textInfo}>Ainda cabe: <Text style={styles.text}>{data.qtdRestante} litros</Text></Text>
                        <Text style={styles.textInfo}>Responsável: <Text style={styles.text}>{data.responsavel.nome}</Text></Text>
                    </View>
                    <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd' }}></View>
                    <GraficoTanque dataGrafico={data} handleOpenModal={handleOpenModal} />
                </View>
            </Swipeable>

            <Modal
                animationType='slide'
                transparent={false}
                visible={modalVisible}
            >
                <Map dataMap={data} onClose={handleCloseModal} />

            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={isAlertInfo}
            >
                {isAlertInfo &&
                    <AlertSimpleInfo
                        onConfirm={handleConfirm}
                        onClose={closeAlertInfo}
                        title='Aviso'
                        message={'Deseja realmente APAGAR este TANQUE?'}
                    />}
            </Modal>

            <Modal
                animationType='fade'
                transparent={false}
                visible={modalUpdate}
            >
                <ModalUpdateTanque
                    dataTanque={data}
                    onCloseModal={closeModal}
                    showAlertErroSuccess={showAlertErroSuccess}
                />
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={alertVisible}
            >
                {alertVisible &&
                    <AlertErrorSuccess
                        onClose={closeAlertErroSuccess}
                        title='Aviso'
                        message={errorMsg}
                        titleButton='Ok'
                        jsonPath={msgType}
                        buttonColor={'#292b2c'}
                    />
                }
            </Modal>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf9f9',
        margin: 12,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 5
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    infoCard: {
        flex: 1.5,
        backgroundColor: '#faf9f9',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 6,

    },
    textInfo: {
        fontWeight: 'bold',
        fontSize: 14.5,
    },
    text: {
        fontWeight: 'normal'
    },
    actions: {
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a9d8f',
        width: 60
    },
    actionText: {
        fontSize: 16,
        color: '#FFF'
    }
})
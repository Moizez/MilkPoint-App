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

export default function ListaTanques({ data, onRefresh, onLoad }) {

    const { baseUrl } = useContext(AuthContext)

    const [modalVisible, setModalVisible] = useState(false)
    const [isAlertInfo, setAlertInfo] = useState(false)
    const [idTanque, setIdTanque] = useState(data.id)
    const [modalUpdate, setModalUpdate] = useState(false)
    const [alertVisible, setAlertVisible] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [jsonIcon, setJsonIcon] = useState('error')
    const [status, setStatus] = useState(false)

    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')
    let msgType = jsonIcon == 'error' ? error : success

    const changeIconJson = (value) => setJsonIcon(value)

    const onChangeState = async (idTanque, status) => {

        const headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append("Accept", 'application/json')

        const data = { id: idTanque, status: status }

        await fetch(`${baseUrl}tanque/` + parseInt(idTanque),
            {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            })
    }

    useEffect(() => {
        setStatus(data.status)
    }, [])

    const handleChangeStateInative = async () => {
        if (data.depPendenteCount > 0 | data.retPendenteCount > 0) {
            setStatus(false)
            setJsonIcon('error')
            setErrorMsg('Há depósitos ou retiradas pendentes, '
                + 'deseja realmente desativa-lo?')
            setAlertInfo(true)
        } else {
            setStatus(false)
            setErrorMsg('Deseja realmente desativar este tanque?')
            setAlertInfo(true)
        }
    }

    const handleChangeStateActive = async () => {
        setErrorMsg('Deseja realmente ativar este tanque?')
        setStatus(true)
        setAlertInfo(true)
    }

    const handleConfirm = async () => {
        onLoad(true)
        setAlertInfo(false)
        setIdTanque(data.id)
        await onChangeState(idTanque, status)
        await onRefresh()
        onLoad(false)
    }

    const handleCloseModal = () => setModalVisible(false)
    const handleOpenModal = () => setModalVisible(true)
    const closeAlertInfo = () => {
        setStatus(!status)
        setAlertInfo(false)
    }
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
            <>
                {status ?
                    <TouchableOpacity onPress={() => handleChangeStateInative()} style={{ ...styles.actions, backgroundColor: '#da1e37' }}>
                        <Icon name='beaker-remove' size={25} color={'#FFF'} />
                        <Text style={styles.actionText}>Inativar</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => handleChangeStateActive()} style={{ ...styles.actions, backgroundColor: '#2a9d8f' }}>
                        <Icon name='beaker-check' size={25} color={'#FFF'} />
                        <Text style={styles.actionText}>Ativar</Text>
                    </TouchableOpacity>
                }
            </>
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
                        message={errorMsg}
                    />}
            </Modal>

            <Modal
                animationType='fade'
                transparent={false}
                visible={modalUpdate}
            >
                <ModalUpdateTanque
                    dataTanque={data}
                    onRefresh={onRefresh}
                    onCloseModal={closeModal}
                    showAlertErroSuccess={showAlertErroSuccess}
                    changeIconJson={changeIconJson}
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
        backgroundColor: '#0077b6',
        width: 75
    },
    actionText: {
        fontSize: 16,
        color: '#FFF'
    }
})

/*/Função para deletar um tanque
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
   }*/
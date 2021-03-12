import React, { useState, useEffect } from 'react'
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import TankCard from '../../../components/Cards/TankCard'
import AlertSimpleInfo from '../../../components/AlertSimpleInfo'
import AlertErrorSuccess from '../../../components/AlertErrorSuccess'
import Map from '../../../components/Map'
import ModalUpdateTanque from '../../../components/ModalUpdateTanque'
import ActionButton from '../../../components/ActionButton'
import Api from '../../../services/technician.api'

const TanksList = ({ data, onRefresh }) => {

    const [modalVisible, setModalVisible] = useState(false)
    const [modalObservation, setModalObservation] = useState(false)
    const [isAlertInfo, setAlertInfo] = useState(false)
    const [idTanque, setIdTanque] = useState(data.id)
    const [modalUpdate, setModalUpdate] = useState(false)
    const [alertVisible, setAlertVisible] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [jsonIcon, setJsonIcon] = useState('error')
    const [status, setStatus] = useState(false)
    const [observation, setObservation] = useState('')

    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')
    let msgType = jsonIcon == 'error' ? error : success

    const changeIconJson = (value) => setJsonIcon(value)

    const onChangeState = async (idTanque, status, observation) => {
        await Api.setTankState(idTanque, status, observation)
    }

    useEffect(() => {
        setStatus(data.status)
    }, [])

    const handleChangeStateInative = async () => {
        if (data.depPendenteCount > 0 | data.retPendenteCount > 0) {
            setStatus(false)
            setJsonIcon('error')
            setErrorMsg('Há depósitos ou retiradas pendentes, '
                + 'deseja realmente inativa-lo?')
            setModalObservation(true)
        } else {
            setStatus(false)
            setErrorMsg('Deseja realmente inativar este tanque?')
            setModalObservation(true)
        }
    }

    const handleChangeStateActive = async () => {
        setErrorMsg('Deseja realmente ativar este tanque?')
        setStatus(true)
        setAlertInfo(true)
    }

    const handleConfirm = async () => {
        setAlertInfo(false)
        setModalObservation(false)
        setIdTanque(data.id)
        await onChangeState(idTanque, status, observation)
        await onRefresh()
    }

    const handleCloseModal = () => setModalVisible(false)
    const handleOpenModal = () => setModalVisible(true)
    const closeAlertInfo = () => {
        setStatus(!status)
        setAlertInfo(false)
    }
    const closeObservationModal = () => {
        setObservation('')
        setStatus(!status)
        setModalObservation(false)
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
                <TankCard
                    data={data}
                    tankStatus={data.status ? false : true}
                />
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

            <Modal
                animationType='fade'
                transparent={true}
                visible={modalObservation}
            >
                <>
                    <TouchableWithoutFeedback onPress={() => setModalObservation(false)}>
                        <View style={styles.offset} />
                    </TouchableWithoutFeedback>
                    <View style={styles.modalObservation}>
                        <View style={styles.modalView}>
                            <Text style={{ ...styles.textInfo, fontSize: 17, textAlign: 'center' }}>{errorMsg}</Text>
                            <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 3 }} />
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon name='comment-text-multiple' size={50} color='#adb5bd' />
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                                    <TouchableOpacity style={styles.btnSuggestion} onPress={() => setObservation('Em manutenção')}>
                                        <Text>Em manutenção</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnSuggestion} onPress={() => setObservation('Leite em análise')}>
                                        <Text>Leite em análise</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnSuggestion} onPress={() => setObservation('Aguardando liberação')}>
                                        <Text>Aguardando liberação</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnSuggestion} onPress={() => setObservation('Em testes')}>
                                        <Text>Em testes</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 3 }} />
                            <TextInput style={styles.input}
                                placeholder='Por favor, informe o motivo'
                                autoCorrect={true}
                                autoCapitalize='sentences'
                                multiline={true}
                                defaultValue='Teste'
                                value={observation}
                                onChangeText={(text) => setObservation(text)}
                            />

                            <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 3 }}></View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                <ActionButton
                                    onAction={closeObservationModal}
                                    btnColor='#da1e37'
                                    title='Fechar'
                                    nameIcon='close-circle'
                                />

                                <View style={{ marginHorizontal: 8 }} />

                                <ActionButton
                                    onAction={() => handleConfirm(observation)}
                                    btnColor='#2a9d8f'
                                    title='Confirmar'
                                    nameIcon='check-circle'
                                />
                            </View>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={() => setModalObservation(false)}>
                        <View style={styles.offset} />
                    </TouchableWithoutFeedback>
                </>
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
    },
    modalObservation: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: '95%',
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 5
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    input: {
        backgroundColor: '#DDD',
        textAlign: 'center',
        fontSize: 17,
        width: 320,
        height: 60,
        color: '#000',
        marginVertical: 10,
        padding: 15,
        borderRadius: 8,
    },
    btnSuggestion: {
        height: 35,
        backgroundColor: '#adb5bd',
        padding: 8,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3
    }
})

export default TanksList
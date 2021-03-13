import React, { useState, useEffect, Fragment } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import styled from 'styled-components/native';

import Api from '../../../services/technician.api'
import ActionModal from '../../../components/Modals/ActionModal'
import WarningModal from '../../../components/Modals/WarningModal'

import TankCard from '../../../components/Cards/TankCard'
import Map from '../../../components/Map'
import ActionButton from '../../../components/ActionButton'
import InactiveTankModal from '../../../components/Modals/InactiveTankModal'

const TanksList = ({ data, loadPage }) => {

    const navigation = useNavigation()

    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')

    const [modalVisible, setModalVisible] = useState(false)
    const [modalObservation, setModalObservation] = useState(false)
    const [idTanque, setIdTanque] = useState(data.id)
    const [modalUpdate, setModalUpdate] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [status, setStatus] = useState(false)
    const [observation, setObservation] = useState('')

    const [inactiveTankModal, setInactiveTankModal] = useState(false)
    const [actionModal, setActionModal] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [lottie, setLottie] = useState(error)

    const openInactiveTankModal = () => setInactiveTankModal(true)
    const closeInactiveTankModal = () => setInactiveTankModal(false)
    const openActionModal = () => setActionModal(true)
    const closeActionModal = () => setActionModal(false)
    const openWarningModal = () => setWarningModal(true)
    const closeWarningModal = () => setWarningModal(false)

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
            setLottie(error)
            setTypeMessage('Há depósitos ou retiradas pendentes!')
            openWarningModal()
        } else {
            setStatus(false)
            setTypeMessage('Deseja realmente inativar este tanque?')
            openWarningModal()
        }
    }

    const handleChangeStateActive = async () => {
        setTypeMessage('Deseja realmente ativar este tanque?')
        setStatus(true)
        openActionModal()
    }

    const handleConfirm = async () => {
        closeActionModal()
        closeWarningModal()
        setIdTanque(data.id)
        await onChangeState(idTanque, status, observation)
        await loadPage()
    }

    const handleCloseModal = () => setModalVisible(false)
    const closeAlertInfo = () => {
        setStatus(!status)
        closeActionModal()
    }
    const closeObservationModal = () => {
        setWarningModal('')
        setStatus(!status)
        closeWarningModal()
    }
    const closeModal = () => setModalUpdate(false)
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
            <Fragment>
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
            </Fragment>
        )
    }

    return (
        <Container>
            <Swipeable
                renderLeftActions={leftActions}
                renderRightActions={rightActions}
            >
                <TankCard
                    data={data}
                    tankStatus={data.status ? false : true}
                    openPage={() => navigation.navigate('RouteMap')}
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
                visible={actionModal}
            >
                <ActionModal
                    closeModal={closeActionModal}
                    confirmModal={handleConfirm}
                    title={'Sei lá'}
                />
            </Modal>

            {/*   <Modal
                animationType='fade'
                transparent={false}
                visible={modalUpdate}
            >
               <ModalUpdateTanque
                    dataTanque={data}
                    loadPage={loadPage}
                    onCloseModal={closeModal}
                    changeIconJson={changeIconJson}
                />
            </Modal>
            */}

            <Modal
                animationType='fade'
                transparent={true}
                visible={warningModal}
            >
                <WarningModal
                    closeModal={closeWarningModal}
                    message={typeMessage}
                    lottie={lottie}
                />

            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={modalObservation}
            >
                <InactiveTankModal

                />
            </Modal>
        </Container >
    );
}

const styles = StyleSheet.create({

    actions: {
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0077b6',
        width: 75,
        height: 120,
        marginTop: 10
    },
    actionText: {
        fontSize: 16,
        color: '#FFF'
    },
})

export default TanksList

const Container = styled.View`
    margin-bottom: 10px;
`;


import React, { useState, useContext, Fragment } from 'react'
import { useNavigation } from '@react-navigation/native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import styled from 'styled-components/native'

import Api from '../../../services/technician.api'
import { RequestContext } from '../../../contexts/request'

import ActionModal from '../../../components/Modals/ActionModal'
import WarningModal from '../../../components/Modals/WarningModal'
import TankCard from '../../../components/Cards/TankCard'
import InactiveTankModal from '../../../components/Modals/InactiveTankModal'

const TanksList = ({ data }) => {

    //Desestruturação do data
    const {
        nome: nomeTanque,
        responsavel: { nome: nomeResponsavel }
    } = data
    const inactiveData = { nomeTanque, nomeResponsavel }

    const navigation = useNavigation()
    const { loadActiveTanks, loadInactiveTanks, setLoading } = useContext(RequestContext)

    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')

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

    const handleChangeInactiveStatus = async (value) => {
        if (value) {
            setObservation(value)
            setTypeMessage('Deseja inativar este tanque?')
            openActionModal()
        } else {
            setTypeMessage('Informe o motivo da inativação!')
            openWarningModal()
        }
    }

    const handleChangeActiveStatus = async () => {
        setTypeMessage('Deseja ativar este tanque?')
        openActionModal()
    }

    const handleConfirm = async () => {
        setLoading(true)
        await Api.setTankState(data.id, !data.status, observation)
        setLottie(success)
        setTypeMessage(data.status ? 'Tanque inativado com sucesso!' : 'Tanque ativado com sucesso!')
        closeActionModal()
        closeInactiveTankModal()
        setTimeout(() => {
            loadActiveTanks()
            loadInactiveTanks()
            setLoading(false)
            openWarningModal()
        }, 2000);
    }

    const leftActions = () => {
        return (
            <ActionLeftButton style={{ elevation: 5 }} onPress={() => navigation.navigate('UpdateTankForm', { data: data })}>
                <Icon name='pencil' size={25} color={'#FFF'} />
                <Text>Editar</Text>
            </ActionLeftButton>
        )
    }

    const rightActions = () => {
        return (
            <Fragment>
                {data.status ?
                    <ActionRightButton style={{ elevation: 5 }} onPress={openInactiveTankModal}>
                        <Icon name='beaker-remove' size={25} color={'#FFF'} />
                        <Text>Inativar</Text>
                    </ActionRightButton> :
                    <ActionRightButton style={{ elevation: 5 }} onPress={handleChangeActiveStatus} style={{ backgroundColor: '#2a9d8f' }}>
                        <Icon name='beaker-check' size={25} color={'#FFF'} />
                        <Text>Ativar</Text>
                    </ActionRightButton>
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
                animationType='fade'
                transparent={true}
                visible={actionModal}
            >
                <ActionModal
                    closeModal={closeActionModal}
                    confirmModal={handleConfirm}
                    title={typeMessage}
                />
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={warningModal}
            >
                <WarningModal
                    closeModal={closeWarningModal}
                    message={typeMessage}
                    lottie={lottie}
                    bgColor={true}
                />

            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={inactiveTankModal}
            >
                <InactiveTankModal
                    closeModal={closeInactiveTankModal}
                    confirmModal={handleChangeInactiveStatus}
                    openWarning={openWarningModal}
                    data={inactiveData}
                    setMessage={setTypeMessage}
                />
            </Modal>

        </Container >
    );
}

export default TanksList

const Container = styled.View`
    flex: 1;
`;

const Modal = styled.Modal``;

const ActionRightButton = styled.TouchableOpacity`
    background-color: #cc444b;
    width: 70px;
    height: 125px;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    margin-right: 3px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
`;

const ActionLeftButton = styled.TouchableOpacity`
    background-color: #00b4d8;
    width: 70px;
    height: 125px;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    margin-left: 3px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
`;

const Text = styled.Text`
    font-size: 16px;
    color: #FFF;
`;

import React, { useState, useEffect, useContext } from 'react'
import { Modal, View } from 'react-native'

import Api from '../../../services/producer.api'
import { AuthContext } from '../../../contexts/auth'

import CardInfo from '../../../components/CardInfo'
import ModalCancel from '../../../components/ModalCancel'
import CancelModal from '../../../components/Modals/CancelModal'
import AlertErrorSuccess from '../../../components/AlertErrorSuccess'
import AlertSimpleInfo from '../../../components/AlertSimpleInfo'

const PendingDepositsList = ({ data, loadProducerDeposits }) => {

    let success = require('../../../assets/lottie/delete-confirm.json')

    const { user, loadListDepositosResolvidos } = useContext(AuthContext)

    const [alertVisible, setAlertVisible] = useState(false)
    const [isAlertInfo, setAlertInfo] = useState(false)
    const [modalCancelVisible, setModalCancelVisible] = useState(false)

    const [cancelModal, setCancelModal] = useState(false)

    const openCancelModal = () => setCancelModal(true)
    const closeCancelModal = () => setCancelModal(false)

    //Cancelamento de depósitos pelo produtor
    const confirmacaoDeposito = async (confirmacao, idDeposito) => {
        await Api.setCancelDeposit(confirmacao, idDeposito)
    }

    useEffect(() => {
        loadProducerDeposits()
    }, [])

    //Função para cancelar o depósito
    function handleCancel() {
        setAlertInfo(true)
    }

    const handleConfirm = async () => {
        setAlertInfo(false)
        setAlertVisible(true)
        await confirmacaoDeposito(false, data.id)
        setModalCancelVisible(false)
    }

    const ErrorSuccesAlert = () => {
        if (alertVisible) {
            return (
                <AlertErrorSuccess
                    onClose={closeAlertErroSuccess}
                    title='Aviso'
                    message={'Depósito cancelado com sucesso!'}
                    titleButton='Ok'
                    jsonPath={success}
                    buttonColor={'#292b2c'}
                />
            )
        }
    }

    const InformationAlert = () => {
        if (isAlertInfo) {
            return (
                <AlertSimpleInfo
                    dataInfo={data}
                    onConfirm={handleConfirm}
                    onClose={closeAlertInfo}
                    title='Aviso'
                    message={'Deseja realmente CANCELAR este DEPÓSITO?'}
                />
            )
        }
    }

    const closeAlertInfo = () => setAlertInfo(false)
    const handleOpenCancelModal = () => setModalCancelVisible(true)
    const handleCloseCancelModal = () => setModalCancelVisible(false)
    const closeAlertErroSuccess = () => {
        setAlertVisible(false)
        loadProducerDeposits()
    }

    return (
        <View>

            <CardInfo
                showModal={openCancelModal}
                dataInfo={data}
                titlePerfil={'Produtor: '}
                infoPerfil={data.produtor.nome}
            />

            <Modal
                transparent={true}
                visible={cancelModal}
                animationType='slide'
            >
                <CancelModal
                    data={data}
                    closeCancelModal={closeCancelModal}
                    onCancel={handleCancel}
                />
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={alertVisible}
            >
                {ErrorSuccesAlert()}
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={isAlertInfo}
            >
                {InformationAlert()}
            </Modal>

        </View>
    );
}

export default PendingDepositsList
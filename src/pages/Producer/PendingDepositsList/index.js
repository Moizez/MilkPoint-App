import React, { useState, useEffect, useContext, Fragment } from 'react'
import { Modal, View } from 'react-native'

import Api from '../../../services/producer.api'
import { AuthContext } from '../../../contexts/auth'

import CancelModal from '../../../components/Modals/CancelModal'
import WarningModal from '../../../components/Modals/WarningModal'
import ActionModal from '../../../components/Modals/ActionModal'

import RequestCard from '../../../components/Cards/RequestCard'

import CardInfo from '../../../components/CardInfo'

const PendingDepositsList = ({ data, loadProducerDeposits }) => {

    const { user, loadListDepositosResolvidos } = useContext(AuthContext)

    const [cancelModal, setCancelModal] = useState(false)
    const [actionModal, setActionModal] = useState(false)
    const [warningModal, setWarningModal] = useState(false)

    const openCancelModal = () => setCancelModal(true)
    const closeCancelModal = () => setCancelModal(false)
    const openActioModal = () => setActionModal(true)
    const closeActionModal = () => setActionModal(false)
    const openWarningModal = () => setWarningModal(true)
    const closeWarningModal = () => setWarningModal(false)

    //Cancelamento de depósitos pelo produtor
    const confirmacaoDeposito = async (confirmacao, idDeposito) => {
        await Api.setCancelDeposit(confirmacao, idDeposito)
    }

    useEffect(() => {
        loadProducerDeposits()
    }, [])

    //Função para cancelar o depósito
    function handleCancel() {
        openActioModal()
    }

    const handleConfirm = async () => {
        await confirmacaoDeposito(false, data.id)
        loadProducerDeposits()
        closeActionModal()
        closeCancelModal()
        openWarningModal()
    }

    return (
        <Fragment>

            <RequestCard
                showModal={openCancelModal}
                data={data}
                role={'Produtor: '}
                roleName={data.produtor.nome}
            />

            <Modal
                transparent={true}
                visible={cancelModal}
                animationType='slide'
            >
                <CancelModal
                    data={data}
                    closeModal={closeCancelModal}
                    confirmModal={handleCancel}
                />
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={warningModal}
            >
                <WarningModal
                    closeModal={closeWarningModal}
                    message={'Depósito cancelado com sucesso!'}
                    lottie={require('../../../assets/lottie/delete-confirm.json')}
                    bgColor={true}
                />
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={actionModal}
            >
                <ActionModal
                    closeModal={closeActionModal}
                    confirmModal={handleConfirm}
                />
            </Modal>
        </Fragment>
    );
}

export default PendingDepositsList
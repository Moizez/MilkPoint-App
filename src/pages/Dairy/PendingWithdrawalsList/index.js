import React, { useState, useEffect } from 'react'
import { Modal } from 'react-native'
import styled from 'styled-components/native';

import Api from '../../../services/dairy.api'

import CancelModal from '../../../components/Modals/CancelModal'
import WarningModal from '../../../components/Modals/WarningModal'
import ActionModal from '../../../components/Modals/ActionModal'
import RequestCard from '../../../components/Cards/RequestCard'

const PendingWithdrawalsList = ({ data, loadPage }) => {

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
    const withdrawalConfirmation = async (confirmacao, idRetirada) => {
        await Api.setCancelWithdrawal(confirmacao, idRetirada)
    }

    useEffect(() => {
        loadPage()
    }, [])

    //Função para cancelar o depósito
    function handleCancel() {
        openActioModal()
    }

    const handleConfirm = async () => {
        await withdrawalConfirmation(false, data.id)
        closeActionModal()
        closeCancelModal()
        openWarningModal()
        setTimeout(() => {
            closeWarningModal()
            loadPage()
        }, 2500);
    }

    return (
        <Container>

            <RequestCard
                showModal={openCancelModal}
                data={data}
                role={'Laticínio: '}
                roleName={data.laticinio.nome}
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
                    message={'Retirada cancelada com sucesso!'}
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
        </Container>
    );
}

export default PendingWithdrawalsList

export const Container = styled.View`
    margin-bottom: 10px;
`;
import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components/native';

import Api from '../../../services/producer.api'
import { RequestContext } from '../../../contexts/request'

import CancelModal from '../../../components/Modals/CancelModal'
import WarningModal from '../../../components/Modals/WarningModal'
import ActionModal from '../../../components/Modals/ActionModal'
import RequestCard from '../../../components/Cards/RequestCard'

const PendingDepositsList = ({ data, loadPage }) => {

    const { loadCanceledDeposits } = useContext(RequestContext)

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
    const depositConfirmation = async (confirmacao, idDeposito) => {
        await Api.setCancelDeposit(confirmacao, idDeposito)
    }

    //Função para cancelar o depósito
    const handleCancel = () => {
        openActioModal()
    }

    const handleConfirm = async () => {
        await depositConfirmation(false, data.id)
        loadCanceledDeposits()
        closeActionModal()
        closeCancelModal()
        openWarningModal()
        setTimeout(() => {
            closeWarningModal()
            loadPage()
        }, 2000);
    }

    return (
        <Container>

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
                    title={'Deseja realmente cancelar?'}
                />
            </Modal>

        </Container>
    );
}

export default PendingDepositsList

const Container = styled.View``;
const Modal = styled.Modal``;
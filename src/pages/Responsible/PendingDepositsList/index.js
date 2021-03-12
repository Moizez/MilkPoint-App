import React, { useState } from 'react';
import styled from 'styled-components/native';

import Api from '../../../services/responsable.api'

import AcceptOrRefuseModal from '../../../components/Modals/AcceptOrRefuseModal'
import WarningModal from '../../../components/Modals/WarningModal'
import ActionModal from '../../../components/Modals/ActionModal'
import RequestCard from '../../../components/Cards/RequestCard'

const PendingDepositsList = ({ data, loadPage }) => {

    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')
    let cancel = require('../../../assets/lottie/delete-confirm.json')

    const [acceptOrRefuseModal, setAcceptOrRefuseModal] = useState(false)
    const [actionModal, setActionModal] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [lottie, setLottie] = useState(error)
    const [requestType, setRequestType] = useState('')

    const openAcceptOrRefuseModal = () => setAcceptOrRefuseModal(true)
    const closeAcceptOrRefuseModal = () => setAcceptOrRefuseModal(false)
    const openActioModal = () => setActionModal(true)
    const closeActionModal = () => setActionModal(false)
    const openWarningModal = () => setWarningModal(true)
    const closeWarningModal = () => setWarningModal(false)

    //Confirmação da depositos pelo responsável
    const confirmacaoDeposito = async (confirmacao, idDeposito, observacao) => {
        await Api.setDepositConfirmation(confirmacao, idDeposito, observacao)
    };

    //Função para confirmar a depósito
    const handleConfirm = () => {
        if (data.quantidade <= data.tanque.qtdRestante) {
            setLottie(success)
            setRequestType('Confirmar esta solicitação?')
            openActioModal()
        } else {
            setLottie(error)
            setTypeMessage('O valor excede o limite do tanque!')
            openWarningModal()
        }
    }

    const doneConfirm = async () => {
        await confirmacaoDeposito(true, data.id, '')
        setTypeMessage('Depósito confirmado com sucesso!')
        closeActionModal()
        closeAcceptOrRefuseModal()
        openWarningModal()
        setTimeout(() => {
            closeWarningModal()
            loadPage()
        }, 2500);
    }

    const doneCancel = async (observacao) => {
        await confirmacaoDeposito(false, data.id, observacao)
        setLottie(cancel)
        setTypeMessage('Depósito cancelado com sucesso!')
        closeAcceptOrRefuseModal()
        openWarningModal()
        setTimeout(() => {
            closeWarningModal()
            loadPage()
        }, 2500);
    }

    return (

        <Container>
            <RequestCard
                showModal={openAcceptOrRefuseModal}
                data={data}
                role={'Produtor: '}
            />

            <Modal
                animationType='fade'
                transparent={true}
                visible={acceptOrRefuseModal}
            >
                <AcceptOrRefuseModal
                    data={data}
                    closeModal={closeAcceptOrRefuseModal}
                    cancelModal={doneCancel}
                    confirmModal={handleConfirm}
                    openActioModal={openActioModal}
                    openWarning={openWarningModal}
                    setMessage={setTypeMessage}
                    role={'Produtor'}
                    roleName={data.produtor.nome}
                    statusTanque={data.tanque.status}
                    obs={data.tanque.observacao}
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
                />
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={actionModal}
            >
                <ActionModal
                    closeModal={closeActionModal}
                    confirmModal={doneConfirm}
                    title={requestType}
                />
            </Modal>

        </Container>

    );
}

export default PendingDepositsList

const Container = styled.View``;
const Modal = styled.Modal``;
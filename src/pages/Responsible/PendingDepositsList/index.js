import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';

import Api from '../../../services/responsable.api'
import { RequestContext } from '../../../contexts/request'

import AcceptOrRefuseModal from '../../../components/Modals/AcceptOrRefuseModal'
import WarningModal from '../../../components/Modals/WarningModal'
import ActionModal from '../../../components/Modals/ActionModal'
import RefuseModal from '../../../components/Modals/RefuseModal'
import RequestCard from '../../../components/Cards/RequestCard'

const PendingDepositsList = ({ data, loadPage }) => {

    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')
    let cancel = require('../../../assets/lottie/delete-confirm.json')

    const { loadResponsibleTank } = useContext(RequestContext)

    const [acceptOrRefuseModal, setAcceptOrRefuseModal] = useState(false)
    const [actionModal, setActionModal] = useState(false)
    const [refuseModal, setRefuseModal] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [lottie, setLottie] = useState(error)
    const [observacao, setObservacao] = useState('')

    const openAcceptOrRefuseModal = () => setAcceptOrRefuseModal(true)
    const closeAcceptOrRefuseModal = () => setAcceptOrRefuseModal(false)
    const openActionModal = () => setActionModal(true)
    const closeActionModal = () => setActionModal(false)
    const openRefuseModal = () => setRefuseModal(true)
    const closeRefuseModal = () => setRefuseModal(false)
    const openWarningModal = () => setWarningModal(true)
    const closeWarningModal = () => setWarningModal(false)

    //Confirmação da depositos pelo responsável
    const depositConfirmation = async (confirmacao, idDeposito, observacao) => {
        await Api.setDepositConfirmation(confirmacao, idDeposito, observacao)
    };

    //Função para confirmar a depósito
    const handleConfirm = () => {
        if (data.quantidade <= data.tanque.qtdRestante) {
            setLottie(success)
            openActionModal()
        } else {
            setLottie(error)
            setTypeMessage('O valor excede o limite do tanque!')
            openWarningModal()
        }
    }

    const handleCancel = (observacao) => {
        setObservacao(observacao)
        setLottie(cancel)
        openRefuseModal()
    }

    const doneConfirm = async () => {
        await depositConfirmation(true, data.id, '')
        setTypeMessage('Depósito confirmado com sucesso!')
        closeActionModal()
        closeAcceptOrRefuseModal()
        openWarningModal()
        setTimeout(() => {
            closeWarningModal()
            loadPage()
        }, 2000);
        loadResponsibleTank()
    }

    const doneCancel = async () => {
        await depositConfirmation(false, data.id, observacao)
        setTypeMessage('Depósito cancelado com sucesso!')
        closeRefuseModal()
        closeAcceptOrRefuseModal()
        openWarningModal()
        setTimeout(() => {
            closeWarningModal()
            loadPage()
        }, 2000);
    }

    return (

        <Container>
            <RequestCard
                showModal={openAcceptOrRefuseModal}
                data={data}
                role={'Produtor: '}
                roleName={data.produtor.nome}
            />

            <Modal
                animationType='fade'
                transparent={true}
                visible={acceptOrRefuseModal}
            >
                <AcceptOrRefuseModal
                    data={data}
                    closeModal={closeAcceptOrRefuseModal}
                    cancelModal={handleCancel}
                    confirmModal={handleConfirm}
                    openActionModal={openActionModal}
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
                    title={'Confirmar esta solicitação?'}
                />
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={refuseModal}
            >
                <RefuseModal
                    closeModal={closeRefuseModal}
                    confirmModal={doneCancel}
                    title={'Recusar esta solicitação?'}
                />
            </Modal>

        </Container>

    );
}

export default PendingDepositsList

const Container = styled.View``;
const Modal = styled.Modal``;
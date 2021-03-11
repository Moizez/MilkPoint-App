import React, { useState } from 'react';
import styled from 'styled-components/native';

import Api from '../../../services/responsable.api'

import ModalChoice from '../../../components/ModalChoice'
import AlertSimpleInfo from '../../../components/AlertSimpleInfo'
import AlertErrorSuccess from '../../../components/AlertErrorSuccess'
import RequestCard from '../../../components/Cards/RequestCard'

const PendingDepositsList = ({ data, loadPage }) => {

    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')
    let cancel = require('../../../assets/lottie/delete-confirm.json')

    const errorChange = () => {
        if (jsonIcon === 'error') return error
        if (jsonIcon === 'success') return success
        else return cancel
    }

    const [typeMessage, setTypeMessage] = useState('')
    const [jsonIcon, setJsonIcon] = useState('error')

    //States dos modais
    const [isVisibleCard, setVisibleCard] = useState(false)
    const [isAlertSimpleInfo, setAlertSimpleInfo] = useState(false)
    const [isAlertErroSuccess, setAlertErroSuccess] = useState(false)

    const openCancelModal = () => setCancelModal(true)
    const closeCancelModal = () => setCancelModal(false)
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
            setJsonIcon('success')
            setAlertSimpleInfo(true)
        } else {
            setJsonIcon('error')
            setTypeMessage('O valor solicitado excede a capacidade atual!')
            setAlertErroSuccess(true)
        }
    }

    const doneConfirm = async () => {
        setAlertSimpleInfo(false)
        setTypeMessage('Depósito confirmado com sucesso!')
        setAlertErroSuccess(true)
        await confirmacaoDeposito(true, data.id, '')
        setVisibleCard(false)
    }

    const doneCancel = async (observacao) => {
        setJsonIcon('cancel')
        setTypeMessage('Depósito cancelado com sucesso!')
        setAlertErroSuccess(true)
        await confirmacaoDeposito(false, data.id, observacao)
        setVisibleCard(false)
    }

    const InfoAlertSimple = () => {
        if (isAlertSimpleInfo) {
            return (
                <AlertSimpleInfo
                    dataInfo={data}
                    onConfirm={doneConfirm}
                    onClose={hideModalInfo}
                    title='Aviso'
                    message={'Deseja realmente CONFIRMAR este DEPÓSITO?'}
                />
            )
        }
    }

    const ErrorSuccesAlert = () => {
        if (isAlertErroSuccess) {
            return (
                <AlertErrorSuccess
                    onClose={hideAlertErroSuccess}
                    title='Aviso'
                    message={typeMessage}
                    titleButton='Ok'
                    jsonPath={errorChange()}
                    buttonColor={'#292b2c'}
                />
            )
        }
    }

    const showModal = () => { setVisibleCard(true) }
    const hideModal = () => { setVisibleCard(false) }
    const hideModalInfo = () => { setAlertSimpleInfo(false) }
    const hideAlertErroSuccess = () => {
        setAlertErroSuccess(false)
        loadPage()
    }

    return (

        <Container>
            <RequestCard
                showModal={showModal}
                dataInfo={data}
                titlePerfil={'Produtor: '}
                infoPerfil={data.produtor.nome}
            />

            <Modal
                animationType='fade'
                transparent={true}
                visible={isVisibleCard}
            >
                <ModalChoice
                    dataInfo={data}
                    doneCancel={doneCancel}
                    hideModal={hideModal}
                    handleConfirm={handleConfirm}
                    titlePerfil={'Produtor: '}
                    infoPerfil={data.produtor.nome}
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

        </Container>

    );
}

export default PendingDepositsList

const Container = styled.View`
    flex: 1;
    margin-bottom: 10px;
`;

const Modal = styled.Modal``;
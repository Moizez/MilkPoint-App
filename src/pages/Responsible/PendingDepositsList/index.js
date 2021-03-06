import React, { useState, useContext } from 'react';
import { Modal, View } from 'react-native';

import Api from '../../../services/responsable.api'
import { AuthContext } from '../../../contexts/auth'

import CardInfo from '../../../components/CardInfo'
import ModalChoice from '../../../components/ModalChoice'
import AlertSimpleInfo from '../../../components/AlertSimpleInfo'
import AlertErrorSuccess from '../../../components/AlertErrorSuccess'

const PendingDepositsList = ({ data, onRefresh }) => {

    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')
    let cancel = require('../../../assets/lottie/delete-confirm.json')

    const errorChange = () => {
        if (jsonIcon === 'error') return error
        if (jsonIcon === 'success') return success
        else return cancel
    }

    const {  } = useContext(AuthContext)

    const [typeMessage, setTypeMessage] = useState('')
    const [jsonIcon, setJsonIcon] = useState('error')

    //States dos modais
    const [isVisibleCard, setVisibleCard] = useState(false)
    const [isAlertSimpleInfo, setAlertSimpleInfo] = useState(false)
    const [isAlertErroSuccess, setAlertErroSuccess] = useState(false)

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
        onRefresh()
    }

    return (

        <View>
            <CardInfo
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
                visible={isAlertSimpleInfo}
            >
                {InfoAlertSimple()}
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={isAlertErroSuccess}
            >
                {ErrorSuccesAlert()}
            </Modal>

        </View>

    );
}

export default PendingDepositsList
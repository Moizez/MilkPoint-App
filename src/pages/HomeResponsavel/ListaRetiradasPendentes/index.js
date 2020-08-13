import React, { useState, useContext } from 'react';
import { Modal, View } from 'react-native';

import { AuthContext } from '../../../contexts/auth'
import CardInfo from '../../../components/CardInfo'
import ModalChoice from '../../../components/ModalChoice'
import AlertSimpleInfo from '../../../components/AlertSimpleInfo'
import AlertErrorSuccess from '../../../components/AlertErrorSuccess'

export default function ListaRetiradasPendentes({ data, onRefresh }) {

    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')
    let msgType = jsonIcon == 'error' ? error : success

    const { user, loadListRetiradas, loadListTanquesResponsavel, baseUrl } = useContext(AuthContext)

    const [confirmacao, setConfirmacao] = useState(false)
    const [idRetirada, setIdRetirada] = useState(data.id)
    const [efetuou, setEfetuou] = useState(user.apelido)
    const [isAction, setAction] = useState(Boolean)
    const [typeMessage, setTypeMessage] = useState('')
    const [jsonIcon, setJsonIcon] = useState('error')

    //States dos modais
    const [isVisibleCard, setVisibleCard] = useState(false)
    const [isAlertSimpleInfo, setAlertSimpleInfo] = useState(false)
    const [isAlertErroSuccess, setAlertErroSuccess] = useState(false)

    //Confirmação da retiradas pelo responsável
    const confirmacaoRetirada = async (confirmacao, idRetirada, efetuou, observacao) => {
        const data = new FormData()
        data.append("confirmacao", confirmacao)
        data.append("idRetirada", idRetirada)
        data.append("efetuou", efetuou)
        data.append('observacao', observacao)

        await fetch(`${baseUrl}retirada/confirmacao`, { method: 'POST', body: data })
    };

    //Função para confirmar a retirada
    const handleConfirm = () => {
        if (data.quantidade <= data.tanque.qtdAtual) {
            setJsonIcon('success')
            setAction(true)
            setAlertSimpleInfo(true)
        } else {
            setJsonIcon('error')
            setTypeMessage('O valor solicitado excede a capacidade atual!')
            setAlertErroSuccess(true)
        }
    }

    const doneConfirm = async () => {
        setAlertSimpleInfo(false)
        setTypeMessage('Retirada confirmada com sucesso!')
        setAlertErroSuccess(true)
        setConfirmacao(true)
        setIdRetirada(data.id)
        setEfetuou(user.apelido)
        await confirmacaoRetirada(true, idRetirada, efetuou, '')
        await loadListRetiradas()
        await loadListTanquesResponsavel()
        setVisibleCard(false)
    }

    //Função para cancelar a retirada
    const handleCancel = () => {
        setAction(false)
        setAlertSimpleInfo(true)
    }

    const doneCancel = async (observacao) => {
        setAlertSimpleInfo(false)
        setTypeMessage('Retirada cancelada com sucesso!')
        setAlertErroSuccess(true)
        setConfirmacao(false)
        setIdRetirada(data.id)
        setEfetuou(user.apelido)
        await confirmacaoRetirada(false, idRetirada, efetuou, observacao)
        await loadListRetiradas()
        await loadListTanquesResponsavel()
        setVisibleCard(false)
    }

    const InfoAlertSimple = () => {
        if (isAlertSimpleInfo) {
            if (isAction === false) {
                return (
                    <AlertSimpleInfo
                        dataInfo={data}
                        onConfirm={doneCancel}
                        onClose={hideModalInfo}
                        title='Aviso'
                        message={'Deseja realmente CANCELAR esta RETIRADA?'}
                        action
                    />
                )
            } else {
                return (
                    <AlertSimpleInfo
                        dataInfo={data}
                        onConfirm={doneConfirm}
                        onClose={hideModalInfo}
                        title='Aviso'
                        message={'Deseja realmente CONFIRMAR esta RETIRADA?'}
                    />
                )
            }
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
                    jsonPath={msgType}
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
                titlePerfil={'Laticínio: '}
                infoPerfil={data.laticinio.nome}
            />

            <Modal
                animationType='slide'
                transparent={true}
                visible={isVisibleCard}
            >
                <ModalChoice
                    dataInfo={data}
                    hideModal={hideModal}
                    handleCancel={handleCancel}
                    handleConfirm={handleConfirm}
                    titlePerfil={'Laticínio: '}
                    infoPerfil={data.laticinio.nome}
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
    )
}
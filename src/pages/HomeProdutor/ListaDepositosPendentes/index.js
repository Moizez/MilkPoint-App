import React, { useState, useContext } from 'react'
import { Modal, View } from 'react-native'

import { AuthContext } from '../../../contexts/auth'
import CardInfo from '../../../components/CardInfo'
import ModalCancel from '../../../components/ModalCancel'
import AlertErrorSuccess from '../../../components/AlertErrorSuccess'
import AlertSimpleInfo from '../../../components/AlertSimpleInfo'

export default function ListaDepositossPendentes({ data, onRefresh }) {

    let baseUrl = 'https://milkpointapi.cfapps.io/api/'
    let success = require('../../../assets/lottie/delete-confirm.json')

    const { user } = useContext(AuthContext)

    const [alertVisible, setAlertVisible] = useState(false)
    const [isAlertInfo, setAlertInfo] = useState(false)

    const [modalCancelVisible, setModalCancelVisible] = useState(false)
    const [confirmacao, setConfirmacao] = useState(false)
    const [idDeposito, setIdDeposito] = useState(data.id)
    const [efetuou, setEfetuou] = useState(user.apelido)

    //Confirmação da depósitos pelo responsável
    const confirmacaoDeposito = async (confirmacao, idDeposito, efetuou) => {
        const data = new FormData();
        data.append("confirmacao", confirmacao);
        data.append("idDeposito", idDeposito);
        data.append("efetuou", efetuou);

        await fetch(`${baseUrl}deposito/confirmacao`, { method: 'POST', body: data })
    }

    //Função para cancelar o depósito
    function handleCancel() {
        setAlertInfo(true)
    }

    const handleConfirm = async () => {
        setAlertInfo(false)
        setAlertVisible(true)
        setConfirmacao(false)
        setIdDeposito(data.id)
        setEfetuou(user.apelido)
        await confirmacaoDeposito(false, idDeposito, efetuou)
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
                    message={'Deseja realmente cancelar este depósito?'}
                />
            )
        }
    }

    const closeAlertInfo = () => setAlertInfo(false)
    const handleOpenCancelModal = () => setModalCancelVisible(true)
    const handleCloseCancelModal = () => setModalCancelVisible(false)
    const closeAlertErroSuccess = () => {
        setAlertVisible(false)
        onRefresh()
    }

    return (
        <View>

            <CardInfo
                showModal={handleOpenCancelModal}
                dataInfo={data}
                titlePerfil={'Produtor: '}
                infoPerfil={data.produtor.nome}
            />

            <Modal
                animationType='slide'
                transparent={true}
                visible={modalCancelVisible}
            >
                <ModalCancel
                    dataTanque={data}
                    onClose={handleCloseCancelModal}
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
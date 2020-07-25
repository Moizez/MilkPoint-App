import React, { useState, useContext } from 'react'
import { Modal, View } from 'react-native'

import { AuthContext } from '../../../contexts/auth'
import CardInfo from '../../../components/CardInfo'
import ModalCancel from '../../../components/ModalCancel'
import AlertErrorSuccess from '../../../components/AlertErrorSuccess'
import AlertSimpleInfo from '../../../components/AlertSimpleInfo'

export default function ListaRetiradasPendentes({ data, onRefresh }) {

    let baseUrl = 'https://milkpointapi.cfapps.io/api/'
    let success = require('../../../assets/lottie/delete-confirm.json')

    const { user, loadListRetiradas } = useContext(AuthContext)

    const [alertVisible, setAlertVisible] = useState(false)
    const [isAlertInfo, setAlertInfo] = useState(false)

    const [modalCancelVisible, setModalCancelVisible] = useState(false)
    const [confirmacao, setConfirmacao] = useState(false)
    const [idRetirada, setIdRetirada] = useState(data.id)
    const [efetuou, setEfetuou] = useState(user.nomeFantasia)

    //Confirmação da retiradas pelo responsável
    const confirmacaoRetirada = async (confirmacao, idRetirada, efetuou) => {
        const data = new FormData();
        data.append("confirmacao", confirmacao);
        data.append("idRetirada", idRetirada);
        data.append("efetuou", efetuou);

        await fetch(`${baseUrl}retirada/confirmacao`, { method: 'POST', body: data })
    };

    //Função para cancelar a retirada
    function handleCancel() {
        setAlertInfo(true)
    }

    const handleConfirm = async () => {
        setAlertInfo(false)
        setAlertVisible(true)
        setConfirmacao(false)
        setIdRetirada(data.id)
        setEfetuou(user.apelido)
        await confirmacaoRetirada(false, idRetirada, efetuou)
        await loadListRetiradas()
        setModalCancelVisible(false)
    }

    const ErrorSuccesAlert = () => {
        if (alertVisible) {
            return (
                <AlertErrorSuccess
                    onClose={closeAlertErroSuccess}
                    title='Aviso'
                    message={'Retirada cancelada com sucesso!'}
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
                    message={'Deseja realmente CANCELAR esta RETIRADA?'}
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
                titlePerfil={'Laticínio: '}
                infoPerfil={data.laticinio.nome}
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
import React, { useState, useContext, useEffect } from 'react'
import { Modal, Keyboard } from 'react-native'
import styled from 'styled-components/native';

import Api from '../../../services/dairy.api'
import { RequestContext } from '../../../contexts/request'

import WithdrawalModal from '../../../components/Modals/WithdrawalModal'
import ConfirmationModal from '../../../components/Modals/ConfirmationModal'
import WarningModal from '../../../components/Modals/WarningModal'
import TankCard from '../../../components/Cards/TankCard'

const TanksList = ({ data, loadTanks }) => {

    const { loadPendingWithdrawalsDairy } = useContext(RequestContext)
    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')

    const [withdrawalModal, setWithdrawalModal] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [lottie, setLottie] = useState('')
    const [qtdInfo, setQtdInfo] = useState()

    const openWithdrawalModal = () => setWithdrawalModal(true)
    const closeWithdrawalModal = () => setWithdrawalModal(false)
    const openConfirmationModal = () => setConfirmationModal(true)
    const closeConfirmationModal = () => setConfirmationModal(false)
    const openWarningModal = () => setWarningModal(true)
    const closeWarningModal = () => setWarningModal(false)

    useEffect(() => {
        loadTanks()
    }, [])

    //Solicitação de depósito pelo produtor
    const requestWithdrawal = async (quantidade, idTanque) => {
        await Api.setWithdrawal(quantidade, idTanque)
    };

    const handleWithdrawal = async (value) => {
        setQtdInfo(value)

        if (data.status) {
            if (isNaN(value) || value <= 0) {
                setLottie(error)
                setTypeMessage('Valor inválido!\nDigite novamente.')
                openWarningModal()
                return
            } if (data.qtdAtual === 0) {
                setLottie(error)
                setTypeMessage('O tanque está vazio!')
                openWarningModal()
                return
            } else if (value > data.qtdAtual) {
                setLottie(error)
                setTypeMessage('O valor excede o limite do tanque!')
                openWarningModal()
                return
            } else {
                setLottie(success)
                openConfirmationModal()
            }
        } else {
            setLottie(error)
            setTypeMessage('Este tanque está inativo!')
            openWarningModal()
            return
        }
        Keyboard.dismiss()
    }

    const handleConfirm = async () => {
        await requestWithdrawal(qtdInfo, data.id)
        closeConfirmationModal()
        closeWithdrawalModal()
        setTypeMessage('Retirada realizada com sucesso!')
        openWarningModal()
        loadPendingWithdrawalsDairy()
    }

    return (
        <Container>

            <TankCard
                data={data}
                openModal={openWithdrawalModal}
                tankStatus={data.status ? false : true}
            />

            <Modal
                transparent={true}
                visible={withdrawalModal}
                animationType='slide'
            >
                <WithdrawalModal
                    confirmModal={handleWithdrawal}
                    closeModal={closeWithdrawalModal}
                    total={data.qtdAtual}
                />
            </Modal>

            <Modal
                animationType='slide'
                transparent={true}
                visible={confirmationModal}
            >
                <ConfirmationModal
                    closeModal={closeConfirmationModal}
                    confirmModal={handleConfirm}
                    data={data}
                    quantidade={qtdInfo}
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
                    bgColor={false}
                />
            </Modal>

        </Container >
    );
}

export default TanksList

const Container = styled.View``;
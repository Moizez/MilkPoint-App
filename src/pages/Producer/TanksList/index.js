import React, { useState, useContext, useEffect, Fragment } from 'react'
import { Modal, Keyboard } from 'react-native'

import Api from '../../../services/producer.api'
import { RequestContext } from '../../../contexts/request'

import DepositModal from '../../../components/Modals/DepositModal'
import ConfirmationModal from '../../../components/Modals/ConfirmationModal'
import WarningModal from '../../../components/Modals/WarningModal'
import TankCard from '../../../components/Cards/TankCard'

const TanksList = ({ data, loadTanks }) => {

    const { loadPendingDepositsProducer } = useContext(RequestContext)
    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')

    const [depositModal, setDepositModal] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [lottie, setLottie] = useState('')
    const [qtdInfo, setQtdInfo] = useState()

    const openDepositModal = () => setDepositModal(true)
    const closeDepositModal = () => setDepositModal(false)
    const openConfirmationModal = () => setConfirmationModal(true)
    const closeConfirmationModal = () => setConfirmationModal(false)
    const openWarningModal = () => setWarningModal(true)
    const closeWarningModal = () => setWarningModal(false)

    useEffect(() => {
        loadTanks()
    }, [])

    //Solicitação de depósito pelo produtor
    const requestDeposit = async (quantidade, idTanque) => {
        await Api.setDeposit(quantidade, idTanque)
    };

    const handleDeposito = async (value) => {
        setQtdInfo(value)

        if (data.status) {
            if (isNaN(value) || value <= 0) {
                setLottie(error)
                setTypeMessage('Valor inválido!\nDigite novamente.')
                openWarningModal()
                return
            } else if (value > data.qtdRestante) {
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
        await requestDeposit(qtdInfo, data.id)
        closeConfirmationModal()
        closeDepositModal()
        setTypeMessage('Depósito realizado com sucesso!')
        openWarningModal()
        loadPendingDepositsProducer()
    }

    return (
        <Fragment>

            <TankCard
                data={data}
                openModal={openDepositModal}
                tankStatus={data.status ? false : true}
            />

            <Modal
                transparent={true}
                visible={depositModal}
                animationType='slide'
            >
                <DepositModal
                    confirmModal={handleDeposito}
                    closeModal={closeDepositModal}
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

        </Fragment >
    );
}

export default TanksList
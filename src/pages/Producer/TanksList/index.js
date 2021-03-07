import React, { useState, useContext, useEffect } from 'react'
import { Modal, Keyboard, View, Text, StyleSheet } from 'react-native'

import Api from '../../../services/producer.api'

import ModalDeposito from '../../../components/ModalDeposito'
import DepositModal from '../../../components/Modals/DepositModal'
import GraficoTanque from '../../../components/GraficoTanque'
import AlertErrorSuccess from '../../../components/AlertErrorSuccess'
import AlertInformation from '../../../components/AlertInformation'
import { AuthContext } from '../../../contexts/auth'

const TanksList = ({ data, loadTanks }) => {

    // const { loadPendingDepositsProducer } = useContext(AuthContext)

    const [modalVisible, setModalVisible] = useState(false)
    const [depositModal, setDepositModal] = useState(false)

    const [alertVisible, setAlertVisible] = useState(false)
    const [isAlertInfo, setAlertInfo] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [jsonIcon, setJsonIcon] = useState('error')

    const [idTanque, setIdTanque] = useState(data.id)
    const [qtdInfo, setQtdInfo] = useState()

    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')
    let msgType = jsonIcon == 'error' ? error : success

    useEffect(() => {
        loadTanks()
    }, [])

    //Solicitação de depósito pelo produtor
    const requestDeposito = async (quantidade, idTanque) => {
        await Api.setDeposit(quantidade, idTanque)
    };

    const handleDeposito = async (value) => {
        if (data.status) {
            if (isNaN(value) || value <= 0) {
                setJsonIcon('error')
                setTypeMessage('Valor inválido, digite a quantidade novamente!')
                setAlertVisible(true)
            } else if (value > data.qtdRestante) {
                setJsonIcon('error')
                setTypeMessage('Seu depósito excede o valor máximo aceito pelo tanque!')
                setAlertVisible(true)
            } else {
                setQtdInfo(value)
                setJsonIcon('success')
                setAlertInfo(true)
            }
        } else {
            await loadTanks()
            setJsonIcon('error')
            setTypeMessage(`Este tanque está inativo!`)
            setAlertVisible(true)
        }
        Keyboard.dismiss()
    }

    const handleConfirm = async (value) => {
        setAlertInfo(false)
        setTypeMessage('Depósito realizado com sucesso! Aguarde a confirmação.')
        setAlertVisible(true)
        setIdTanque(data.id)
        await requestDeposito(value, idTanque)
        setModalVisible(false)
    }

    const handleCloseModal = () => setModalVisible(false)
    const handleOpenModal = () => setModalVisible(true)
    const closeAlertInfo = () => setAlertInfo(false)
    const closeAlertErroSuccess = () => setAlertVisible(false)

    const openModalDate = () => setDepositModal(true)

    return (
        <View style={styles.container}>

            <View style={styles.cardContainer} activeOpacity={0.7}>
                <View style={styles.infoCard}>
                    <Text style={styles.textInfo}>Tanque: <Text style={styles.text}>{data.nome}</Text></Text>
                    <Text style={styles.textInfo}>Tipo do leite: <Text style={styles.text}>{data.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</Text></Text>
                    <Text style={styles.textInfo}>Vol. atual: <Text style={styles.text}>{data.qtdAtual} litros</Text></Text>
                    <Text style={styles.textInfo}>Cabem: <Text style={styles.text}>{data.qtdRestante} litros</Text></Text>
                    <Text style={styles.textInfo}>Responsável: <Text style={styles.text}>{data.responsavel.nome}</Text></Text>
                    {!data.status && <Text style={{ ...styles.textInfo, color: '#da1e37' }}>Inativo: <Text style={styles.text}>{data.observacao}</Text></Text>}
                </View>

                <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd' }}></View>

                <GraficoTanque dataGrafico={data} handleOpenModal={openModalDate} activeTanque={data.status ? false : true} />
            </View>

            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
            >
                <ModalDeposito
                    onConfirme={handleDeposito}
                    onClose={handleCloseModal}
                />
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={isAlertInfo}
            >
                {isAlertInfo &&
                    <AlertInformation
                        dataInfo={data}
                        qtd={qtdInfo}
                        onConfirm={handleConfirm}
                        onClose={closeAlertInfo}
                        title='Aviso'
                        message={'Confirme os dados'}
                    />
                }
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={alertVisible}
            >
                {alertVisible &&
                    <AlertErrorSuccess
                        onClose={closeAlertErroSuccess}
                        title='Aviso'
                        message={typeMessage}
                        titleButton='Ok'
                        jsonPath={msgType}
                        buttonColor={'#292b2c'}
                    />
                }
            </Modal>

            <DepositModal
                show={depositModal}
                setShow={setDepositModal}
            />

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf9f9',
        margin: 8,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 5
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    infoCard: {
        flex: 1.5,
        backgroundColor: '#faf9f9',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 6,

    },
    textInfo: {
        fontWeight: 'bold',
        fontSize: 14.5,
    },
    text: {
        fontWeight: 'normal',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#2a9d8f',
        borderWidth: 2,
        borderColor: '#FFF'
    },
})

export default TanksList
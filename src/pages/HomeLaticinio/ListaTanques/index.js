import React, { useState, useContext } from 'react'
import { FAB } from 'react-native-paper'
import { Modal, Keyboard, View, Text, StyleSheet } from 'react-native'

import Map from '../../../components/Map'
import ModalDepositoRetirada from '../../../components/ModalDepositoRetirada'
import GraficoTanque from '../../../components/GraficoTanque'
import AlertErrorSuccess from '../../../components/AlertErrorSuccess'
import AlertInformation from '../../../components/AlertInformation'

import { AuthContext } from '../../../contexts/auth'

export default function ListaTanques({ data }) {

    const { user, loadListRetiradasPendentes, baseUrl } = useContext(AuthContext)

    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisibleDois, setModalVisibleDois] = useState(false)
    const [alertVisible, setAlertVisible] = useState(false)
    const [isAlertInfo, setAlertInfo] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [jsonIcon, setJsonIcon] = useState('error')

    const [idLat, setIdLat] = useState(user.id)
    const [idTanque, setIdTanque] = useState(data.id)
    const [qtdInfo, setQtdInfo] = useState()

    //Fab button
    const [state, setState] = useState({ open: false })
    const onStateChange = ({ open }) => setState({ open })
    const { open } = state

    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')
    let msgType = jsonIcon == 'error' ? error : success

    //Solicitação de retirada pelo laticinio
    const requestRetirada = async (quantidade, idLat, idTanque) => {
        const data = new FormData()
        data.append("quantidade", quantidade)
        data.append("idLat", idLat)
        data.append("idTanque", idTanque)

        await fetch(`${baseUrl}retirada`, { method: 'POST', body: data })
    };

    function handleRetirada(value) {
        if (isNaN(value) || value <= 0) {
            setJsonIcon('error')
            setTypeMessage('Valor inválido, digite a quantidade novamente!')
            setAlertVisible(true)
        } else if (value > data.qtdAtual) {
            setJsonIcon('error')
            setTypeMessage('Sua retirada excede o valor máximo aceito pelo tanque!')
            setAlertVisible(true)
        } else {
            setQtdInfo(value)
            setJsonIcon('success')
            setAlertInfo(true)
        }
        Keyboard.dismiss()
    }

    const handleConfirm = async (value) => {
        setAlertInfo(false)
        setTypeMessage('Retirada realizada com sucesso! Aguarde a confirmação.')
        setAlertVisible(true)
        setIdLat(user.id)
        setIdTanque(data.id)
        await requestRetirada(value, idLat, idTanque)
        loadListRetiradasPendentes()
        setModalVisibleDois(false)
        setModalVisible(false)
    }

    const handleCloseModal = () => setModalVisible(false)
    const handleOpenModal = () => setModalVisible(true)
    const handleCloseModalDois = () => setModalVisibleDois(false)
    const closeAlertInfo = () => { setAlertInfo(false) }
    const closeAlertErroSuccess = () => setAlertVisible(false)
    const changeRetirada = () => setRetiradaTotal(true)


    const ErrorSuccesAlert = () => {
        if (alertVisible) {
            return (
                <AlertErrorSuccess
                    onClose={closeAlertErroSuccess}
                    title='Aviso'
                    message={typeMessage}
                    titleButton='Ok'
                    jsonPath={msgType}
                    buttonColor={'#292b2c'}
                />
            )
        }
    }

    const InformationAlert = () => {
        if (isAlertInfo) {
            return (
                <AlertInformation
                    dataInfo={data}
                    qtd={qtdInfo}
                    onConfirm={handleConfirm}
                    onClose={closeAlertInfo}
                    title='Aviso'
                    message={'Confirme os dados'}
                />
            )
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.cardContainer}>
                <View style={styles.infoCard}>
                    <Text style={styles.textInfo}>Tanque: <Text style={styles.text}>{data.nome}</Text></Text>
                    <Text style={styles.textInfo}>Tipo do leite: <Text style={styles.text}>{data.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</Text></Text>
                    <Text style={styles.textInfo}>Vol. atual: <Text style={styles.text}>{data.qtdAtual} litros</Text></Text>
                    <Text style={styles.textInfo}>Ainda cabe: <Text style={styles.text}>{data.qtdRestante} litros</Text></Text>
                    <Text style={styles.textInfo}>Responsável: <Text style={styles.text}>{data.responsavel.nome}</Text></Text>
                </View>

                <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd' }}></View>

                <GraficoTanque dataGrafico={data} handleOpenModal={handleOpenModal} />
            </View>

            <Modal
                animationType='slide'
                transparent={false}
                visible={modalVisible}
            >
                <Map dataMap={data} onClose={handleCloseModal} />

                <FAB.Group
                    fabStyle={{ backgroundColor: '#da1e37', borderWidth: 2, borderColor: '#FFF' }}
                    color={'#292b2c'}
                    open={open}
                    icon={open ? 'close' : 'basket-unfill'}
                    actions={[
                        {
                            icon: 'gauge-full',
                            label: 'Retirada total',
                            color: '#da1e37',
                            onPress: () => {
                                let valor = data.qtdAtual
                                handleRetirada(valor)
                            },
                        },
                        {
                            icon: 'numeric',
                            label: 'Retirada parcial',
                            color: '#da1e37',
                            onPress: () => setModalVisibleDois(true),
                        },
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {
                        if (open) {
                            // do something if the speed dial is open
                        }
                    }}
                />

            </Modal>

            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisibleDois}
            >
                <ModalDepositoRetirada
                    onConfirme={handleRetirada}
                    onClose={handleCloseModalDois}
                    onChange={changeRetirada}
                    data={data}
                />
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={isAlertInfo}
            >
                {InformationAlert()}
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={alertVisible}
            >
                {ErrorSuccesAlert()}
            </Modal>

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf9f9',
        margin: 12,
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
        fontWeight: 'normal'
    }

})
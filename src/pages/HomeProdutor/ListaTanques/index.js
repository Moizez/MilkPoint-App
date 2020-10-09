import React, { useState, useContext } from 'react'
import { Modal, Keyboard, View, Text, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { FAB } from 'react-native-paper'
import moment from 'moment'
import 'moment/locale/pt-br'

import ModalDepositoRetirada from '../../../components/ModalDepositoRetirada'
import GraficoTanque from '../../../components/GraficoTanque'
import AlertErrorSuccess from '../../../components/AlertErrorSuccess'
import AlertInformation from '../../../components/AlertInformation'
import Map from '../../../components/Map'
import { AuthContext } from '../../../contexts/auth'

export default function ListaTanques({ data }) {

    const { user, loadListDepositosPendentes, baseUrl } = useContext(AuthContext)

    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisibleDois, setModalVisibleDois] = useState(false)
    const [alertVisible, setAlertVisible] = useState(false)
    const [isAlertInfo, setAlertInfo] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [jsonIcon, setJsonIcon] = useState('error')

    const [idProd, setIdProd] = useState(user.id)
    const [idTanque, setIdTanque] = useState(data.id)
    const [qtdInfo, setQtdInfo] = useState()

    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')
    let msgType = jsonIcon == 'error' ? error : success

    //Enviar SMS
    const sendSms = async (value) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append("Accept", 'application/json')

        const data = {
            phoneNumber: user.phoneNumber,
            message: `\n
            Solicitação de DEPÓSITO do produtor ${user.nome}:
            - Quantidade: ${value} litros;
            - Data: ${moment(new Date()).locale('pt-br').format('L')}.`
        }

        await fetch('https://milkpoint.herokuapp.com/api/sms',
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            })
    }

    //Solicitação de depósito pelo produtor
    const requestDeposito = async (quantidade, idProd, idTanque) => {
        const data = new FormData();
        data.append("quantidade", quantidade);
        data.append("idProd", idProd);
        data.append("idTanque", idTanque);

        await fetch(`${baseUrl}deposito`, { method: 'POST', body: data })
    };

    const saveDepositoAsync = async (quantidade, idProd, idTanque) => {
        const deposito = {
            quantidade: quantidade,
            idProd: idProd,
            idTanque: idTanque
        }

        const existeDeposito = await AsyncStorage.getItem('@Deposito')

        let novoDeposito = JSON.parse(existeDeposito);
        if (!novoDeposito) {
            novoDeposito = []
            novoDeposito.push(deposito)
        }

        //let id = String(Math.floor(Math.random() * 10000))
        await AsyncStorage.setItem('@deposito', JSON.stringify(novoDeposito)).then(() => {
            console.log('Salvo com sucesso!')
        })
            .catch(() => {
                console.log('Erro ao salvar!')
            })
    }

    function handleDeposito(value) {
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
        Keyboard.dismiss()
    }

    const handleConfirm = async (value) => {
        setAlertInfo(false)
        setTypeMessage('Depósito realizado com sucesso! Aguarde a confirmação.')
        setAlertVisible(true)
        setIdProd(user.id)
        setIdTanque(data.id)
        //await saveDepositoAsync(value, idProd, idTanque)
        await requestDeposito(value, idProd, idTanque)
        sendSms(value)
        loadListDepositosPendentes()
        setModalVisibleDois(false)
        setModalVisible(false)
    }

    const handleCloseModal = () => setModalVisible(false)
    const handleOpenModal = () => setModalVisible(true)
    const handleCloseModalDois = () => setModalVisibleDois(false)
    const closeAlertInfo = () => setAlertInfo(false)
    const closeAlertErroSuccess = () => setAlertVisible(false)

    return (
        <View style={styles.container}>

            <View style={styles.cardContainer} activeOpacity={0.7}>
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

                <FAB
                    style={styles.fab}
                    small={false}
                    icon="basket-fill"
                    color='#292b2c'
                    onPress={() => setModalVisibleDois(true)}
                />

            </Modal>

            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisibleDois}
            >
                <ModalDepositoRetirada
                    onConfirme={handleDeposito}
                    onClose={handleCloseModalDois}
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
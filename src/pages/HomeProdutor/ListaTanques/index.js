import React, { useState, useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Modal, Keyboard } from 'react-native'

import ModalDetalheTanque from '../../../components/ModalDetalheTanque'
import ModalDepositoRetirada from '../../../components/ModalDepositoRetirada'
import GraficoTanque from '../../../components/GraficoTanque'

import { AuthContext } from '../../../contexts/auth'

import {
    BoxGeral, Container, Nome, NomeValor, BoxTanque, BoxFabBtn, FabBtn, FabText
} from './styles'

let baseUrl = 'https://milkpointapi.cfapps.io/api/'

export default function ListaTanques({ data }) {

    const { user } = useContext(AuthContext)

    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisibleDois, setModalVisibleDois] = useState(false)

    const [idProd, setIdProd] = useState(user.id)
    const [idTanque, setIdTanque] = useState(data.id)

    //Solicitação de depósito pelo produtor
    const requestDeposito = async (quantidade, idProd, idTanque) => {
        const data = new FormData();
        data.append("quantidade", quantidade);
        data.append("idProd", idProd);
        data.append("idTanque", idTanque);

        await fetch(`${baseUrl}deposito`, { method: 'POST', body: data })
    };

    async function handleDeposito(value) {
        if (isNaN(value) || value <= 0) {
            alert('Valor inválido, digite a quantidade novamente!')
        } else if (value > data.qtdAtual) {
            alert("Seu depósito excede o valor máximo atual do tanque!")
            return
        } else {
            alert("Deposito realizado com sucesso!" + "\n" + "Aguarde a confirmação!")
            setIdProd(user.id)
            setIdTanque(data.id)
            await requestDeposito(value, idProd, idTanque)
            setModalVisibleDois(false)
            setModalVisible(false)
        }
        Keyboard.dismiss()
    }

    function handleCloseModal() {
        return setModalVisible(false)
    }

    function handleCloseModalDois() {
        return setModalVisibleDois(false)
    }

    return (
        <BoxGeral>
            <Container onPress={() => { setModalVisible(true) }}>
                <BoxTanque>
                    <Nome>Tanque: <NomeValor>{data.nome}</NomeValor></Nome>
                    <Nome>Tipo do Leite: <NomeValor>{data.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</NomeValor></Nome>
                    <Nome>Vol. Atual: <NomeValor>{data.qtdAtual} litros</NomeValor></Nome>
                    <Nome>Ainda cabe: <NomeValor>{data.qtdRestante} litros</NomeValor></Nome>
                    <Nome>Responsável: <NomeValor>{data.responsavel.apelido}</NomeValor></Nome>
                </BoxTanque>

                <GraficoTanque dataGrafico={data} />
            </Container>

            <Modal
                animationType='slide'
                transparent={false}
                visible={modalVisible}
            >
                <ModalDetalheTanque
                    dataTanque={data}
                    onClose={handleCloseModal}
                />

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

                <BoxFabBtn>
                    <FabBtn onPress={() => { setModalVisibleDois(true) }}>
                        <Icon
                            name='arrow-up-bold-hexagon-outline'
                            color='#FFF'
                            size={20}>
                        </Icon>
                        <FabText>Depositar</FabText>
                    </FabBtn>
                </BoxFabBtn>

            </Modal>
        </BoxGeral>
    );
}
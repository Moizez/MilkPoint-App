import React, { useState, useContext } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'

import { AuthContext } from '../../../contexts/auth'

import {
    BoxGeral, Container, Nome, BoxIcon, BoxInfoTanque, BoxModal, BoxTitulo, TituloInfo, NomeValor,
    BtnFechar, BtnText, BoxInfo, BoxInfoModal, BtnConfirm, BtnCancel, Btn, NomeModal
} from './styles'

let baseUrl = 'https://milkpointapi.cfapps.io/api/'

export default function ListaRetiradasPendentes({ data, onRefresh }) {

    const { user } = useContext(AuthContext)

    const [modalVisible, setModalVisible] = useState(false)
    const [confirmacao, setConfirmacao] = useState(false)
    const [idRetirada, setIdRetirada] = useState(data.id)
    const [efetuou, setEfetuou] = useState(user.apelido)

    //Confirmação da retiradas pelo responsável
    const confirmacaoRetirada = async (confirmacao, idRetirada, efetuou) => {
        const data = new FormData();
        data.append("confirmacao", confirmacao);
        data.append("idRetirada", idRetirada);
        data.append("efetuou", efetuou);

        await fetch(`${baseUrl}retirada/confirmacao`, { method: 'POST', body: data })

        if (confirmacao) {
            alert("Pedido confirmado com sucesso!" + "\n" + "Veja sempre a quantidade restante!")
        }
        else {
            alert("Pedido cancelado com sucesso!" + "\n" + "Veja sempre a quantidade restante!")
        }
    };

    //Função para confirmar a retirada
    async function handleConfirm() {
        setConfirmacao(true)
        setIdRetirada(data.id)
        setEfetuou(user.apelido)
        await confirmacaoRetirada(true, idRetirada, efetuou)
        onRefresh()
        setModalVisible(false)
    }

    //Função para cancelar a retirada
    async function handleCancel() {
        setConfirmacao(false)
        setIdRetirada(data.id)
        setEfetuou(user.apelido)
        await confirmacaoRetirada(false, idRetirada, efetuou)
        onRefresh()
        setModalVisible(false)
    }

    function bucketColor(status) {
        if (data.confirmacao == true) {
            return status = 'Confirmada'
        } if (data.excluido == true) {
            return status = 'Cancelada'
        } else {
            return status = 'Pendente'
        }
    }
    let status = bucketColor()

    return (
        <Container>
            <BoxInfoTanque>
                <Nome>Tanque: <NomeValor>{data.tanque.nome}</NomeValor></Nome>
                <Nome>Tipo do leite: <NomeValor>{data.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</NomeValor></Nome>
                <Nome>Valor requerido: <NomeValor>{data.quantidade} litros</NomeValor></Nome>
                <Nome>Nome do produtor: <NomeValor>{data.laticinio.nome}</NomeValor></Nome>
                <Nome>Data: <NomeValor>{data.dataNow} às {data.horaNow}h</NomeValor></Nome>
            </BoxInfoTanque>
            <BoxIcon onPress={() => { setModalVisible(true) }}>
                <NomeValor>Retirada</NomeValor>
                {status == 'Confirmada' && (
                    <Icon
                        name='bucket'
                        size={70}
                        color='#2a9d8f'
                    ></Icon>
                )}
                {status == 'Cancelada' && (
                    <Icon
                        name='bucket'
                        size={70}
                        color='#da1e37'
                    ></Icon>
                )}
                {status != 'Cancelada' && status != 'Confirmada' && (
                    < Icon
                        name='bucket'
                        size={70}
                        color='#adb5bd'
                    ></Icon>
                )}
                <NomeValor>{status}</NomeValor>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                >
                    <BoxModal>
                        <BoxTitulo>
                            <TituloInfo>Confirmação de retirada do tanque: </TituloInfo>
                        </BoxTitulo>

                        <BoxInfoModal>
                            <NomeModal>Tanque: <NomeValor>{data.tanque.nome}</NomeValor></NomeModal>
                            <NomeModal>Tipo do leite: <NomeValor>{data.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</NomeValor></NomeModal>
                            <NomeModal>Valor requerido: <NomeValor>{data.quantidade} litros</NomeValor></NomeModal>
                            <NomeModal>Nome do produtor: <NomeValor>{data.laticinio.nome}</NomeValor></NomeModal>
                            <NomeModal>Data: <NomeValor>{data.dataNow} às {data.horaNow}h</NomeValor></NomeModal>
                        </BoxInfoModal>

                        <BoxInfo>
                            <BtnConfirm>
                                <TouchableOpacity onPress={() => { handleConfirm() }}>
                                    <Btn>Confirmar Retirada</Btn>
                                </TouchableOpacity>
                            </BtnConfirm>

                            <BtnCancel>
                                <TouchableOpacity onPress={() => { handleCancel() }}>
                                    <Btn>Cancelar Retirada</Btn>
                                </TouchableOpacity>
                            </BtnCancel>
                        </BoxInfo>

                        <BtnFechar onPress={() => { setModalVisible(false) }}>
                            <BtnText>Fechar</BtnText>
                        </BtnFechar>
                    </BoxModal>

                </Modal>

            </BoxIcon>
        </Container>
    );
}
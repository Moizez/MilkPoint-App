import React, { useState } from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'

import {
    BoxGeral, Container, Nome, BoxIcon, BoxInfoTanque, BoxModal, BoxTitulo, TituloInfo,
    BtnFechar, BtnText, BoxInfo, BoxInfoModal, BtnConfirm, BtnCancel, Btn, NomeModal
} from './styles'

export default function ListaRetiradasPendentes({ data }) {

    const [modalVisible, setModalVisible] = useState(false)
    const [confirmacao, setConfirmacao] = useState() // não está alterando o estado da variavel confirmação
    const [idRetirada, setIdRetirada] = useState(data.id)

    //Confirmação da retiradas pelo responsável
    const confirmacaoRetirada = async (confirmacao, idRetirada) => {
        const data = new FormData();
        data.append("confirmacao", confirmacao);
        data.append("idRetirada", idRetirada);

        await fetch('https://milkpoint.herokuapp.com/api/retirada/confirmacao', { method: 'POST', body: data })

        if (confirmacao) {
            alert("Pedido confirmado com sucesso!" + "\n" + "Veja sempre a quantidade restante!")
        }
        else {
            alert("Pedido cancelado com sucesso!" + "\n" + "Veja sempre a quantidade restante!")
        }
    };

    //Função para confirmar a retirada
    function handleConfirm() {
        setConfirmacao(true)
        confirmacaoRetirada(true, idRetirada) // forçar a confirmação
        setModalVisible(!modalVisible)
    }

    //Função para cancelar a retirada
    function handleCancel() {
        setConfirmacao(false)
        confirmacaoRetirada(false, idRetirada) // forçar a confirmação
        setModalVisible(!modalVisible)
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

        <BoxGeral>
            <Container>
                <BoxInfoTanque>
                    <Nome>Tanque: {data.tanque.nome}</Nome>
                    <Nome>Retirada solicitada: {data.quantidade}</Nome>
                    <Nome>Nome do laticinio: {data.laticinio.nome}</Nome>
                    <Nome>Status: {status}</Nome>
                </BoxInfoTanque>
                <BoxIcon onPress={() => { setModalVisible(!modalVisible) }}>
                    <Nome>Retirada</Nome>
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
                    <Nome>{status}</Nome>
                </BoxIcon>
            </Container>

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
                        <NomeModal>Tanque: {data.tanque.nome}</NomeModal>
                        <NomeModal>Retirada solicitada: {data.quantidade} litros</NomeModal>
                        <NomeModal>Nome do solicitante: {data.laticinio.nome}</NomeModal>
                        <NomeModal>Data: 20/06/20 - 17h32</NomeModal>
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

                        <BtnFechar onPress={() => { setModalVisible(!modalVisible) }}>
                            <BtnText>Fechar</BtnText>
                        </BtnFechar>
                </BoxModal>

            </Modal>

        </BoxGeral>
    );
}
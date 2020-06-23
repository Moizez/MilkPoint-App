import React, { useState, useContext } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'

import { AuthContext } from '../../../contexts/auth'

import {
    BoxGeral, Container, Nome, BoxIcon, BoxInfoTanque, BoxModal, BoxTitulo, TituloInfo,
    BtnFechar, BtnText, BoxInfo, BoxInfoModal, BtnCancel, Btn, NomeModal
} from './styles'

export default function ListaRetiradasPendentes({ data }) {

    const { user } = useContext(AuthContext)

    const [modalVisible, setModalVisible] = useState(false)
    const [confirmacao, setConfirmacao] = useState(false) // não está alterando o estado da variavel confirmação
    const [idRetirada, setIdRetirada] = useState(data.id)
    const [efetuou, setEfetuou] = useState(user.apelido)

    //Confirmação da retiradas pelo responsável
    const confirmacaoRetirada = async (confirmacao, idRetirada, efetuou) => {
        const data = new FormData();
        data.append("confirmacao", confirmacao);
        data.append("idRetirada", idRetirada);
        data.append("efetuou", efetuou);

        await fetch('https://milkpoint.herokuapp.com/api/retirada/confirmacao', { method: 'POST', body: data })

        if (confirmacao) {
            alert("Pedido confirmado com sucesso!" + "\n" + "Veja sempre a quantidade restante!")
        }
        else {
            alert("Pedido cancelado com sucesso!" + "\n" + "Veja sempre a quantidade restante!")
        }

    };

    //Função para cancelar a retirada
    function handleCancel() {
        setConfirmacao(false)
        setIdRetirada(data.id)
        setEfetuou(user.apelido)
        confirmacaoRetirada(false, idRetirada, efetuou) // forçar a confirmação
        setModalVisible(!modalVisible)
    }


    function bucketColor(status) {
        if (data.confirmacao == true) {
            return status = 'Confirmado'
        } if (data.excluido == true) {
            return status = 'Cancelado'
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
                    <Nome>Nome do laticínio: {data.laticinio.nome}</Nome>
                    <Nome>Data: {data.dataNow} às {data.horaNow}h</Nome>
                </BoxInfoTanque>
                <BoxIcon onLongPress={() => { setModalVisible(!modalVisible) }}>
                    <Nome>Retirada</Nome>
                    {status == 'Confirmado' && (
                        <Icon
                            name='bucket'
                            size={70}
                            color='#2a9d8f'
                        ></Icon>
                    )}
                    {status == 'Cancelado' && (
                        <Icon
                            name='bucket'
                            size={70}
                            color='#da1e37'
                        ></Icon>
                    )}
                    {status != 'Cancelado' && status != 'Confirmado' && (
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
                        <TituloInfo>Informação da retirada pendente: </TituloInfo>
                    </BoxTitulo>

                    <BoxInfoModal>
                        <NomeModal>Tanque: {data.tanque.nome}</NomeModal>
                        <NomeModal>Retirada solicitado: {data.quantidade} litros</NomeModal>
                        <NomeModal>Nome do solicitante: {data.laticinio.nome}</NomeModal>
                        <NomeModal>Data: {data.dataNow} às {data.horaNow}h</NomeModal>
                    </BoxInfoModal>

                    <BoxTitulo>
                        <TituloInfo>Deseja realmente cancelar esta retirada? </TituloInfo>
                    </BoxTitulo>

                    <BoxInfo>
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
import React, { useState, useContext } from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'

import { AuthContext } from '../../contexts/auth'

import {
    BoxGeral, Container, Nome, BoxIcon, BoxInfoTanque, BoxModal, BoxTitulo, TituloInfo,
    BoxBtnText, BtnVoltar, BtnText, BoxInfo, BoxInfoModal, BtnConfirm, BtnCancel, Btn, NomeModal
} from './styles'

export default function DepositoPendenteList({ data }) {

    const [modalVisible, setModalVisible] = useState(false)
    const [confirmacao, setConfirmacao] = useState(false) // não está alterando o estado da variavel confirmação
    const [idDeposito, setIdDeposito] = useState()
    const { depositoPendente, confirmacaoDeposito } = useContext(AuthContext)

    //Função para confirmar a depósito
    function handleConfirm() {
        setConfirmacao(true)
        setIdDeposito(data.id)
        confirmacaoDeposito(true, idDeposito) // forçar a confirmação
        setModalVisible(!modalVisible)
    }

    //Função para cancelar a depósito
    function handleCancel() {
        setConfirmacao(false)
        setIdDeposito(data.id)
        confirmacaoDeposito(false, idDeposito) // forçar a confirmação
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
                    <Nome>Depósito solicitado: {data.quantidade}</Nome>
                    <Nome>Nome do produtor: {data.produtor.nome}</Nome>
                    <Nome>Status: {status}</Nome>
                </BoxInfoTanque>
                <BoxIcon onPress={() => { setModalVisible(!modalVisible) }}>
                    <Nome>Depósito</Nome>
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
                        <TituloInfo>Confirmação de depósito do tanque: </TituloInfo>
                    </BoxTitulo>

                    <BoxInfoModal>
                        <NomeModal>Tanque: {data.tanque.nome}</NomeModal>
                        <NomeModal>Depósito solicitado: {data.quantidade} litros</NomeModal>
                        <NomeModal>Nome do solicitante: {data.produtor.nome}</NomeModal>
                        <NomeModal>Data: 20/06/20 - 17h32</NomeModal>
                    </BoxInfoModal>

                    <BoxInfo>
                        <BtnConfirm>
                            <TouchableOpacity onPress={() => { handleConfirm() }}>
                                <Btn>Confirmar</Btn>
                            </TouchableOpacity>
                        </BtnConfirm>

                        <BtnCancel>
                            <TouchableOpacity onPress={() => { handleCancel() }}>
                                <Btn>Cancelar</Btn>
                            </TouchableOpacity>
                        </BtnCancel>
                    </BoxInfo>

                    <BoxBtnText>
                        <BtnVoltar onPress={() => { setModalVisible(!modalVisible) }}>
                            <BtnText>Fechar</BtnText>
                        </BtnVoltar>
                    </BoxBtnText>
                </BoxModal>

            </Modal>


        </BoxGeral>
    );
}
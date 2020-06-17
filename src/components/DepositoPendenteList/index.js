import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'

import { BoxGeral, Container, Nome, BoxIcon, BoxDeposito } from './styles'

export default function DepositoPendenteList({ data }) {

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
                <BoxDeposito>
                    <Nome>Tanque: {data.tanque.nome}</Nome>
                    <Nome>Depósito solicitado: {data.quantidade}</Nome>
                    <Nome>Nome do produtor: {data.produtor.nome}</Nome>
                    <Nome>Nome do responsável {data.tanque.responsavel.nome}</Nome>
                    <Nome>Status: {status}</Nome>
                </BoxDeposito>
                <BoxIcon>
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
        </BoxGeral>
    );
}
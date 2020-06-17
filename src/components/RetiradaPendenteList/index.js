import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'

import { BoxGeral, Container, Nome, BoxIcon, BoxDeposito } from './styles'

export default function RetiradaPendenteList({ data }) {

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
                <BoxDeposito>
                    <Nome>Tanque: {data.tanque.nome}</Nome>
                    <Nome>Depósito solicitado: {data.quantidade}</Nome>
                    <Nome>Nome do laticinio: {data.laticinio.nome}</Nome>
                    <Nome>Nome do responsável {data.tanque.responsavel.nome}</Nome>
                    <Nome>Status: {status}</Nome>
                </BoxDeposito>
                <BoxIcon>
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
        </BoxGeral>
    );
}
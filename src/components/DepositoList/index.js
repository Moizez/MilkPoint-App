import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'

import { BoxGeral, Container, Nome, BoxIcon, BoxDeposito } from './styles'

export default function DepositoList({ data }) {

    let status = data.confirmacao == true ? 'Confirmado' : 'Pendente' ||
        data.excluido == true ? 'Cancelado' : 'Pendente'

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
                    {data.confirmacao == true ?
                        <Icon
                            name='bucket'
                            size={70}
                            color='#2a9d8f'
                        ></Icon> :
                        < Icon
                            name='bucket'
                            size={70}
                            color='#000'
                        ></Icon> ||
                            data.excluido == true ?
                            <Icon
                                name='bucket'
                                size={70}
                                color='#da1e37'
                            ></Icon> :
                            < Icon
                                name='bucket'
                                size={70}
                                color='#ececec'
                            ></Icon>
                    }
                    <Nome>{status}</Nome>
                </BoxIcon>
            </Container>
        </BoxGeral>
    );
}
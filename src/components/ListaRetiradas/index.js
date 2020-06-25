import React, { useContext } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'

import { AuthContext } from '../../contexts/auth'
import { BoxGeral, Container, Nome, BoxIcon, BoxInfo } from './styles'

export default function ListaRetiradas({ data }) {

    const { user } = useContext(AuthContext)

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
                <BoxInfo>
                    <Nome>Tanque: {data.tanque.nome}</Nome>
                    <Nome>Valor solicitado: {data.quantidade} litros</Nome>
                    {user.perfil == 3 && <Nome>Solicitante: {data.laticinio.nomeFantasia}</Nome>}
                    <Nome>Data : {data.dataNow} às {data.horaNow}h</Nome>
                    {data.confirmacao === false && <Nome>Responsável: {data.tanque.responsavel.nome}</Nome>}
                    <View style={{ borderBottomColor: '#000', borderBottomWidth: 0.5, marginTop: 25, marginBottom: 5 }}></View>
                    {data.excluido === true ? <Nome style={{ textAlign: 'center' }}>Cancelado por: {data.efetuou}</Nome>
                        : <Nome style={{ textAlign: 'center' }}>Responsável: {data.tanque.responsavel.nome}</Nome>}
                </BoxInfo>
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
        </BoxGeral >
    );
}
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/Entypo'
import { View } from 'react-native'
import { format } from 'date-fns'

import { AuthContext } from '../../contexts/auth'
import { BoxGeral, Container, Nome, BoxIcon, BoxInfo } from './styles'

export default function ListaDepositos({ data }) {

    const { user } = useContext(AuthContext)

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
                <BoxInfo>
                    <Nome>Tanque: {data.tanque.nome}</Nome>
                    <Nome>Valor solicitado: {data.quantidade} litros</Nome>
                    {user.perfil == 2 && <Nome>Solicitante: {data.produtor.nome}</Nome>}
                    <Nome>Data : {data.dataNow} às {data.horaNow}h</Nome>
                    <Nome>Responsável: {data.tanque.responsavel.nome}</Nome>
                    <View style={{ borderBottomColor: '#000', borderBottomWidth: 0.5, marginTop: 25, marginBottom: 5 }}></View>
                    <Nome style={{ textAlign: 'center' }}>Cancelado por: {data.efetuou}</Nome>
                </BoxInfo>
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
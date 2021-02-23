import React, { useContext } from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import { AuthContext } from '../../contexts/auth'
import { Container, Nome, NomeValor, BoxIcon, BoxInfo } from './styles'

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
        <Container>
            <BoxInfo>
               <Nome>Tanque:<NomeValor> {data.tanque.nome}</NomeValor></Nome>
                <Nome>Valor solicitado: <NomeValor>{data.quantidade} litros</NomeValor></Nome>
                {user.perfil == 3 && <Nome>Solicitante: <NomeValor>{data.laticinio.nomeFantasia}</NomeValor></Nome>}
                <Nome>Data: <NomeValor> {data.dataNow} às {data.horaNow}h</NomeValor></Nome>
                {data.confirmacao === false && <Nome>Responsável: <NomeValor>{data.tanque.responsavel.nome}</NomeValor></Nome>}
                <View style={{ borderBottomColor: '#000', borderBottomWidth: 0.5, marginTop: 25, marginBottom: 5 }}></View>
                {data.excluido === true ? <Nome style={{ textAlign: 'center' }}>Cancelado por: <NomeValor>{data.efetuou}</NomeValor></Nome>
                    : <Nome style={{ textAlign: 'center' }}>Responsável: <NomeValor>{data.tanque.responsavel.nome}</NomeValor></Nome>}
            </BoxInfo>
            <BoxIcon>
                <NomeValor>Depósito</NomeValor>
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
                <NomeValor>{status}</NomeValor>
            </BoxIcon>
        </Container>
    );
}
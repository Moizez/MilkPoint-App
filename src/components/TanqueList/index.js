import React from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Speedometer from 'react-native-speedometer-chart'

import { Container, Nome, BoxSpeed, BoxTanque } from './styles'

export default function TanqueList({ data }) {

    const navigation = useNavigation()

    function capacidade() {
        let total = data.qtdAtual + data.qtdRestante
        return total
    }

    return (
        <Container onPress={() => navigation.navigate('DetalhesTanque')}>
            <BoxTanque>
                <Nome>Tanque: {data.nome}</Nome>
                <Nome>Tipo do Leite: {data.tipo}</Nome>
                <Nome>Qtd. Atual: {data.qtdAtual} L</Nome>
                <Nome>Qtd. Restante: {data.qtdRestante} L</Nome>
                <Nome>Responsável: {data.responsavel.nome} </Nome>
            </BoxTanque>

            <BoxSpeed>
                <Speedometer
                    value={data.qtdAtual}
                    totalValue={capacidade()}
                    size={160}
                    outerColor="#d3d3d3"
                    internalColor="#292b2c"
                    showText
                    text={data.nome}
                    textStyle={{ color: 'black' }}
                    showLabels
                    labelStyle={{ color: 'blue' }}
                    labelFormatter={number => `${number}`}
                    showPercent
                    percentStyle={{ color: 'red' }}
                />
            </BoxSpeed>

        </Container>
    );
}
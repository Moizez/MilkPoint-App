import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Speedometer from 'react-native-speedometer-chart'
import { BoxGrafico, BoxIconGrafico } from './styles'
import { useNavigation } from '@react-navigation/native'

export default function GraficoTanque({ dataGrafico, handleOpenModal }) {

    const capacidade = dataGrafico.qtdAtual + dataGrafico.qtdRestante
    const navigation = useNavigation()

    function corGrafico() {
        if (dataGrafico.qtdAtual > (capacidade / 4) & dataGrafico.qtdAtual < (capacidade / 2)) {
            return '#f5cb5c'
        } if (dataGrafico.qtdAtual >= (capacidade / 2)) {
            return '#2a9d8f'
        } else {
            return '#da1e37'
        }
    }

    return (
        <BoxGrafico onLongPress={() => navigation.navigate('DetalhesTanque', { data: dataGrafico })} onPress={handleOpenModal}>
            <BoxIconGrafico>
                {dataGrafico.tipo == 'BOVINO' ?
                    <Icon
                        name='cow'
                        color='blue'
                        size={30}>
                    </Icon> :
                    <Icon
                        name='sheep'
                        color='green'
                        size={30}>
                    </Icon>
                }
            </BoxIconGrafico>

            <Speedometer
                value={dataGrafico.qtdAtual}
                totalValue={capacidade}
                size={125}
                outerColor="#d3d3d3"
                internalColor={corGrafico()}
                showText
                text={''}
                textStyle={{ color: 'black' }}
                innerColor={'#ececec'}
                showLabels
                labelStyle={{ color: 'blue' }}
                labelFormatter={number => `${number}`}
                showPercent
                percentStyle={{ color: 'black', fontSize: 20 }}
            />

        </BoxGrafico>
    );
}


import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Speedometer from 'react-native-speedometer-chart'
import { BoxGrafico, BoxIconGrafico } from './styles';

export default function GraficoTanque({ dataGrafico }) {


    function corGrafico() {
        if (dataGrafico.qtdAtual > (capacidade - (capacidade / 3))) {
            return '#2a9d8f'
        } if (dataGrafico.qtdAtual >= (capacidade / 2)) {
            return '#f5cb5c'
        } else {
            return '#da1e37'
        }
    }

    const capacidade = dataGrafico.qtdAtual + dataGrafico.qtdRestante

    return (
        <BoxGrafico>
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
                size={150}
                outerColor="#d3d3d3"
                internalColor={corGrafico()}
                showText
                text={dataGrafico.nome}
                textStyle={{ color: 'black' }}
                showLabels
                labelStyle={{ color: 'blue' }}
                labelFormatter={number => `${number}`}
                showPercent
                percentStyle={{ color: 'red' }}
            />

        </BoxGrafico>
    );
}
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Speedometer from 'react-native-speedometer-chart'
import { useNavigation } from '@react-navigation/native'

import {
    Container, CardBox, InfoBox, Text, BoldText, DividerV, TankChartBox,
    TankIconBox, TankChart, PetImage
} from './styles'

const TankCard = ({ data, openPage }) => {

    const navigation = useNavigation()
    const capacidade = data.qtdAtual + data.qtdRestante

    const images = {
        cow: require('../../../assets/images/cow-circle.png'),
        goat: require('../../../assets/images/goat-circle.png')
    }

    const setCurrentVol = (value, type) => {
        if (value == 0) return type === 0 ? 'Tanque vazio' : 'Tanque cheio'
        else if (value == 1) return `${value} litro`
        else return `${value} litros`
    }

    const chartColor = () => {
        if (data.qtdAtual > (capacidade / 4) & data.qtdAtual < (capacidade / 2)) {
            return '#f5cb5c'
        } else if (data.qtdAtual >= (capacidade / 2)) {
            return '#2a9d8f'
        } else {
            return '#da1e37'
        }
    }

    return (
        <Container>

            <CardBox style={{ elevation: 5 }}>
                <InfoBox>
                    <BoldText>Tanque: <Text>{data.nome}</Text></BoldText>
                    <BoldText>Volume atual: <Text>{setCurrentVol(data.qtdAtual, 0)}</Text></BoldText>
                    <BoldText>Cabem: <Text>{setCurrentVol(data.qtdRestante, 1)}</Text></BoldText>
                    <BoldText>Responsável: <Text>{data.responsavel.nome}</Text></BoldText>
                </InfoBox>

                <DividerV />

                <TankChartBox
                    onPress={openPage}
                    onLongPress={() => navigation.navigate('TankDetails', { data: data })}
                >
                    <TankIconBox>
                        {data.tipo == 'BOVINO' ?
                            <PetImage source={images.cow} /> :
                            <PetImage source={images.goat} />
                        }
                        <Icon name={data.status ? 'beaker-check' : 'beaker-remove'} size={30} color={data.status ? '#2a9d8f' : '#da1e37'} />
                    </TankIconBox>
                    <TankChart>
                        <Speedometer
                            value={data.qtdAtual}
                            totalValue={capacidade}
                            size={110}
                            outerColor="#d3d3d3"
                            internalColor={chartColor()}
                            showText
                            text={''}
                            textStyle={{ color: 'black' }}
                            innerColor={'#ececec'}
                            showLabels
                            labelStyle={{ color: 'blue' }}
                            labelFormatter={number => `${number}`}
                            showPercent
                            percentStyle={{ color: 'black', fontSize: 16 }}
                        />
                    </TankChart>

                </TankChartBox>

            </CardBox>

        </Container>
    );
}

export default TankCard
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Speedometer from 'react-native-speedometer-chart'

import {
    Container, TankChartBox, TankIconBox, PetImage, Text, BoldText, TankChart,
    DividerH, DividerV, InfoBox, ItemBox, InfoTitle, InfoText
} from './styles'

const TanksList = ({ data }) => {

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
        <Container style={{ elevation: 5 }}>
            <TankChartBox
                onPress={() => navigation.navigate('TankDetails', { data: data })}
                activeOpacity={0.9}
            >
                <TankIconBox>
                    {data.tipo == 'BOVINO' ?
                        <PetImage source={images.cow} /> :
                        <PetImage source={images.goat} />
                    }
                    <BoldText>Tanque: <Text>{data.nome}</Text></BoldText>
                    <Icon name={data.status ? 'beaker-check' : 'beaker-remove'} size={35} color={data.status ? '#2a9d8f' : '#da1e37'} />
                </TankIconBox>

                <TankChart>

                    <Speedometer
                        value={data.qtdAtual}
                        totalValue={capacidade}
                        size={170}
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
                        percentStyle={{ color: 'black', fontSize: 22 }}
                    />

                </TankChart>

                <DividerH />

                <InfoBox>
                    <ItemBox>
                        <InfoTitle>Capacidade</InfoTitle>
                        <InfoText>{capacidade} litros</InfoText>
                    </ItemBox>
                    <DividerV />
                    <ItemBox>
                        <InfoTitle>Volume atual</InfoTitle>
                        <InfoText>{setCurrentVol(data.qtdAtual, 0)}</InfoText>
                    </ItemBox>
                    <DividerV />
                    <ItemBox>
                        <InfoTitle>Cabem</InfoTitle>
                        <InfoText>{setCurrentVol(data.qtdRestante, 1)}</InfoText>
                    </ItemBox>
                </InfoBox>

            </TankChartBox>

        </Container>
    );
}

export default TanksList

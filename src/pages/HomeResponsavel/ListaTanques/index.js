import React, { useState } from 'react'
import { Modal, Text } from 'react-native'

import Speedometer from 'react-native-speedometer-chart'
import ModalDetalheTanque from '../../../components/ModalDetalheTanque'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    BoxGeral, Container, Nome, BoxSpeed, BoxTanque, BoxIcon
} from './styles'

export default function ListaTanques({ data }) {

    const [modalVisible, setModalVisible] = useState(false)
    const capacidade = data.qtdAtual + data.qtdRestante

    function corGrafico() {
        if (data.qtdAtual > (capacidade / 4) & data.qtdAtual < (capacidade / 2)) {
            return '#f5cb5c'
        } if (data.qtdAtual >= (capacidade / 2)) {
            return '#2a9d8f'
        } else {
            return '#da1e37'
        }
    }

    function handleCloseModal() {
        return setModalVisible(false)
    }

    return (
        <BoxGeral>
            <Container onPress={() => { setModalVisible(!modalVisible) }}>
                <BoxSpeed>
                    <BoxIcon>
                        {data.tipo == 'BOVINO' ?
                            <Icon
                                name='cow'
                                color='blue'
                                size={40}>
                            </Icon> :
                            <Icon
                                name='sheep'
                                color='green'
                                size={40}>
                            </Icon>
                        }
                        <Nome style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>Tanque: {data.nome}</Nome>
                    </BoxIcon>
                    <Speedometer
                        value={data.qtdAtual}
                        totalValue={capacidade}
                        size={170}
                        outerColor="#d3d3d3"
                        internalColor={corGrafico()}
                        showText
                        text={''}
                        textStyle={{ color: 'black' }}
                        showLabels
                        labelStyle={{ color: 'blue' }}
                        labelFormatter={number => `${number}`}
                        showPercent
                        percentStyle={{ color: 'black', fontSize: 22 }}
                    />
                    <BoxTanque>
                        <Nome style={{ textAlign: 'center', opacity: 0.1 }}>____________________________________________</Nome>
                        <Nome>- Volume atual do tanque é de <Text style={{ fontWeight: 'bold' }}>{data.qtdAtual} litros</Text></Nome>
                        <Nome>- Faltam <Text style={{ fontWeight: 'bold' }}>{data.qtdRestante} litros</Text> para completar o tanque</Nome>
                    </BoxTanque>
                </BoxSpeed>
            </Container>

            <Modal
                animationType='slide'
                transparent={false}
                visible={modalVisible}
            >
                <ModalDetalheTanque
                    dataTanque={data}
                    onClose={handleCloseModal}
                />

            </Modal>

        </BoxGeral>
    );
}

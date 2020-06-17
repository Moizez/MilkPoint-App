import React, { useState } from 'react'
import { Modal, Button, View } from 'react-native'
import Speedometer from 'react-native-speedometer-chart'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    BoxGeral, Container, Nome, BoxSpeed, BoxTanque, BoxModal, BoxInfo, TituloInfo,
    TextInfo, BoxMap, BoxTitulo, BoxSubTitulo, BoxCaracteristicas, BoxEndereco,
    BoxSubCar, BoxSubEnd, BoxIcon, BtnVoltar, BtnText, BoxBtnText
} from './styles'

export default function TanqueResponsavelList({ data }) {

    const [modalVisible, setModalVisible] = useState(false)
    const capacidade = data.qtdAtual + data.qtdRestante

    function corGrafico() {
        if (data.qtdAtual > (capacidade - (capacidade / 3))) {
            return '#da1e37'
        } if (data.qtdAtual > (capacidade / 2)) {
            return '#f5cb5c'
        } else {
            return '#2a9d8f'
        }
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
                        <Nome style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>Tanque: {data.nome}</Nome>
                    </BoxIcon>
                    <Speedometer
                        value={data.qtdAtual}
                        totalValue={capacidade}
                        size={200}
                        outerColor="#d3d3d3"
                        internalColor={corGrafico()}
                        showText
                        text={data.nome}
                        textStyle={{ color: 'black' }}
                        showLabels
                        labelStyle={{ color: 'blue' }}
                        labelFormatter={number => `${number}`}
                        showPercent
                        percentStyle={{ color: 'red' }}
                    />
                    <BoxTanque>
                        <Nome>- Volume atual de leite: {data.qtdAtual} litros</Nome>
                        <Nome>- Volume restante do tanque: {data.qtdRestante} litros</Nome>
                    </BoxTanque>
                </BoxSpeed>
            </Container>

            <Modal
                animationType='slide'
                transparent={false}
                visible={modalVisible}
            >
                <BoxModal>
                    <BoxTitulo>
                        <TituloInfo>Tanque: </TituloInfo>
                        <TituloInfo style={{ color: 'red' }}>{data.nome}</TituloInfo>
                    </BoxTitulo>

                    <BoxSubTitulo>
                        <BoxSubCar>
                            <TextInfo>Caracteristicas</TextInfo>
                        </BoxSubCar>
                        <BoxSubEnd>
                            <TextInfo>Endereço</TextInfo>
                        </BoxSubEnd>
                    </BoxSubTitulo>

                    <BoxInfo>

                        <BoxCaracteristicas>
                            <TextInfo>Tipo do Leite: {data.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</TextInfo>
                            <TextInfo>Qtd. Atual: {data.qtdAtual}L</TextInfo>
                            <TextInfo>Qtd. Restante: {data.qtdRestante}L</TextInfo>
                            <TextInfo>Responsável: {data.responsavel.nome} </TextInfo>
                        </BoxCaracteristicas>
                        <BoxEndereco>
                            <TextInfo>Cidade: {data.localidade}</TextInfo>
                            <TextInfo>Estado: {data.uf}</TextInfo>
                            <TextInfo>CEP: {data.cep}</TextInfo>
                            <TextInfo>Bairro: {data.bairro} </TextInfo>
                            <TextInfo>Rua: {data.logradouro} </TextInfo>
                        </BoxEndereco>
                    </BoxInfo>
                    <BoxMap>
                        <TextInfo>Mapa</TextInfo>
                    </BoxMap>

                    <BoxBtnText>
                        <BtnVoltar onPress={() => { setModalVisible(!modalVisible) }}>
                            <BtnText>Voltar</BtnText>
                        </BtnVoltar>
                    </BoxBtnText>
                </BoxModal>

            </Modal>

        </BoxGeral>
    );
}

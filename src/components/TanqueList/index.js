import React, { useState } from 'react'
import { Modal, Button, StyleSheet } from 'react-native'
import Speedometer from 'react-native-speedometer-chart'

import FabButton from '../FabButton'

import {
    BoxGeral, Container, Nome, BoxSpeed, BoxTanque, BoxModal, BoxInfo, TituloInfo,
    TextInfo, BoxMap, BoxTitulo, BoxSubTitulo, BoxCaracteristicas, BoxEndereco,
    BoxSubCar, BoxSubEnd
} from './styles'

export default function TanqueList({ data }) {

    const [modalVisible, setModalVisible] = useState(false)

    function capacidade() {
        let total = data.qtdAtual + data.qtdRestante
        return total
    }

    return (
        <BoxGeral>
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
                            <TextInfo>Tipo do Leite: {data.tipo}</TextInfo>
                            <TextInfo>Qtd. Atual: {data.qtdAtual} L</TextInfo>
                            <TextInfo>Qtd. Restante: {data.qtdRestante} L</TextInfo>
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

                    <Button
                        title='Fechar Modal'
                        onPress={() => { setModalVisible(!modalVisible) }}
                    ></Button>
                </BoxModal>

                <FabButton
                    style={{ bottom: 100, right: 50 }}
                />
            </Modal>

            <Container onPress={() => { setModalVisible(!modalVisible) }}>
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
                        internalColor={data.qtdAtual > (capacidade() - (capacidade() / 3)) ? '#da1e37' : '#2a9d8f'}
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
        </BoxGeral>
    );
}

const styles = StyleSheet.create({

})

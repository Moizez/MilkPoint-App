import React, { useState, useContext } from 'react'
import { Modal, View, TouchableOpacity, Text } from 'react-native'
import Speedometer from 'react-native-speedometer-chart'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../../contexts/auth'

import {
    BoxGeral, Container, Nome, BoxSpeed, BoxTanque, BoxModal, BoxInfo, TituloInfo,
    TextInfo, BoxMap, BoxTitulo, BoxSubTitulo, BoxCaracteristicas, BoxEndereco,
    BoxSubCar, BoxSubEnd, BoxBtnModal, BtnFechar, BtnText, BoxFabBtn, FabBtn, FabText,
    /*MODAL DOIS*/ BoxModalDois, BoxInfoModalDois, BtnConfirm, Btn, BtnCancel, InputModal
} from './styles'

export default function TanqueList({ data }) {

    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisibleDois, setModalVisibleDois] = useState(false)
    const { requestDeposito, user } = useContext(AuthContext)
    const [quantidade, setQuantidade] = useState()
    const [idProd, setIdProd] = useState()
    const [idTanque, setIdTanque] = useState()

    async function handleDeposito() {
        setQuantidade(quantidade)
        setIdProd(user.id)
        setIdTanque(data.id)
        await requestDeposito(quantidade, idProd, idTanque)
        //alert('Qtd: ' + quantidade + ' IdProd: ' + idProd + ' idTanque: ' + idTanque)
        setModalVisibleDois(!modalVisibleDois)
        setModalVisible(!modalVisible)
    }

    function corGrafico() {
        if (data.qtdAtual > (capacidade - (capacidade / 3))) {
            return '#2a9d8f'
        } if (data.qtdAtual >= (capacidade / 2)) {
            return '#f5cb5c'
        } else {
            return '#da1e37'
        }
    }

    const capacidade = data.qtdAtual + data.qtdRestante

    return (
        <BoxGeral>
            <Container onPress={() => { setModalVisible(!modalVisible) }}>
                <BoxTanque>
                    <Nome>Tanque: {data.nome}</Nome>
                    <Nome>Tipo do Leite: {data.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</Nome>
                    <Nome>Qtd. Atual: {data.qtdAtual}L</Nome>
                    <Nome>Qtd. Restante: {data.qtdRestante}L</Nome>
                    <Nome>Responsável: {data.responsavel.nome} </Nome>
                </BoxTanque>

                <BoxSpeed>
                    <View style={{ flex: 1, marginRight: '80%' }}>
                        {data.tipo == 'BOVINO' ?
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
                    </View>
                    <Speedometer
                        value={data.qtdAtual}
                        totalValue={capacidade}
                        size={150}
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
                </BoxSpeed>
            </Container>

            <Modal
                animationType='slide'
                transparent={false}
                visible={modalVisible}
            >
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisibleDois}
                >
                    <BoxModalDois>

                        <BoxInfoModalDois>
                            <TituloInfo style={{
                                fontSize: 16, fontWeight: 'normal', textAlign: 'center'
                            }}>Solicitação de depósito no tanque
                        </TituloInfo>
                            <InputModal
                                placeholder='Quantidade em litros (L)'
                                autoCorrect={false}
                                autoCapitalize='none'
                                keyboardType='numeric'
                                value={quantidade}
                                onChangeText={(quantidade) => setQuantidade(quantidade)}
                            />

                            <View style={{ flexDirection: 'row' }}>
                                <BtnConfirm>
                                    <TouchableOpacity onPress={() => { handleDeposito() }}>
                                        <Btn>Confirmar</Btn>
                                    </TouchableOpacity>
                                </BtnConfirm>

                                <BtnCancel>
                                    <TouchableOpacity onPress={() => { setModalVisibleDois(!modalVisibleDois) }}>
                                        <Btn>Cancelar</Btn>
                                    </TouchableOpacity>
                                </BtnCancel>
                            </View>

                        </BoxInfoModalDois>

                    </BoxModalDois>
                </Modal>

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

                    <BoxFabBtn>
                        <FabBtn onPress={() => { setModalVisibleDois(!modalVisibleDois) }}>
                            <Icon
                                name='arrow-up-bold-hexagon-outline'
                                color='#FFF'
                                size={20}>
                            </Icon>
                            <FabText>Depositar</FabText>
                        </FabBtn>
                    </BoxFabBtn>

                    <BoxBtnModal>
                        <BtnFechar onPress={() => { setModalVisible(!modalVisible) }}>
                            <BtnText>Voltar</BtnText>
                        </BtnFechar>
                    </BoxBtnModal>

                </BoxModal>

            </Modal>
        </BoxGeral>
    );
}

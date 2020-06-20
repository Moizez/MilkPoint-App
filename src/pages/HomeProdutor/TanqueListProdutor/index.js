import React, { useState, useContext } from 'react'
import { Modal, View, TouchableOpacity, Text } from 'react-native'

import GraficoTanque from '../../../components/GraficoTanque/'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { AuthContext } from '../../../contexts/auth'

import {
    BoxGeral, Container, Nome, BoxTanque, BoxModal, BoxInfo, TituloInfo,
    TextInfo, BoxMap, BoxTitulo, BoxSubTitulo, BoxCaracteristicas, BoxEndereco,
    BoxSubCar, BoxSubEnd, BoxBtnModal, BtnFechar, BtnText, BoxFabBtn, FabBtn, FabText,
    /*MODAL DOIS*/ BoxModalDois, BoxInfoModalDois, BtnConfirm, Btn, BtnCancel, InputModal
} from './styles'

export default function TanqueListProdutor({ data }) {

    const { user } = useContext(AuthContext)

    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisibleDois, setModalVisibleDois] = useState(false)


    const [quantidade, setQuantidade] = useState()
    const [idProd, setIdProd] = useState(user.id)
    const [idTanque, setIdTanque] = useState(data.id)

    //Solicitação de depósito pelo produtor
    const requestDeposito = async (quantidade, idProd, idTanque) => {
        const data = new FormData();
        data.append("quantidade", quantidade);
        data.append("idProd", idProd);
        data.append("idTanque", idTanque);

        await fetch('https://milkpoint.herokuapp.com/api/deposito', { method: 'POST', body: data })

        if (idProd === undefined) {
            alert('Erro ao processar o pedido! QTD: ' + quantidade + ' ID Produtor: ' + idProd + ' ID Tanque: ' + idTanque)
        } else {
            alert("Depósito realizado com sucesso!" + "\n" + "Aguarde a confirmação!")
        }
    };

    async function handleDeposito() {
        setQuantidade(quantidade)
        setIdProd(user.id)
        setIdTanque(data.id)
        await requestDeposito(quantidade, idProd, idTanque)
        setModalVisibleDois(!modalVisibleDois)
        setModalVisible(!modalVisible)
    }

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

                <GraficoTanque dataGrafico={data} />
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

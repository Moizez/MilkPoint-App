import React, { useState } from 'react';
import { View, Modal } from 'react-native';

import { BoxGeral, BoxModal, BoxInfo, TituloInfo, BoxTitulo, BoxEndereco } from './styles'

export function ModalDepositoRetirada() {

    const [modalVisible, setModalVisible] = useState(true)

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
                        <TituloInfo style={{ color: 'red' }}>T-55</TituloInfo>
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
            </Modal >
        </BoxGeral >
    )
}
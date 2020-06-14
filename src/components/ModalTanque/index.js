import React, { useState } from 'react';
import { Text, Modal, Button } from 'react-native';

import { BoxModal } from './styles'

export default function ModalTanque() {

    const [modalVisible, setModalVisible] = useState(true)

    return (

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
        </Modal>
    )
}
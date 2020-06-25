import React, { useState } from 'react';
import MapView from 'react-native-maps'

import {
    BoxModal, BoxTitulo, TituloInfo, BoxSubtitulo, BoxSubCaracteristicas, BoxSubEndereco,
    TextInfo, BoxInfo, BoxCaracteristicas, BoxEndereco, BoxMap, BoxBtnModal, BtnVoltar, BtnText
} from './styles'

export default function ModalDetalheTanque({ dataTanque, onClose }) {

    return (

        <BoxModal>
            <BoxTitulo>
                <TituloInfo>Tanque: </TituloInfo>
                <TituloInfo style={{ color: 'red' }}>{dataTanque.nome}</TituloInfo>
            </BoxTitulo>

            <BoxSubtitulo>
                <BoxSubCaracteristicas>
                    <TextInfo>Caracteristicas</TextInfo>
                </BoxSubCaracteristicas>
                <BoxSubEndereco>
                    <TextInfo>Endereço</TextInfo>
                </BoxSubEndereco>
            </BoxSubtitulo>

            <BoxInfo>

                <BoxCaracteristicas>
                    <TextInfo>Tipo do Leite: {dataTanque.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</TextInfo>
                    <TextInfo>Qtd. Atual: {dataTanque.qtdAtual}L</TextInfo>
                    <TextInfo>Qtd. Restante: {dataTanque.qtdRestante}L</TextInfo>
                    <TextInfo>Responsável: {dataTanque.responsavel.nome} </TextInfo>
                </BoxCaracteristicas>
                <BoxEndereco>
                    <TextInfo>Cidade: {dataTanque.localidade}</TextInfo>
                    <TextInfo>Estado: {dataTanque.uf}</TextInfo>
                    <TextInfo>CEP: {dataTanque.cep}</TextInfo>
                    <TextInfo>Bairro: {dataTanque.bairro} </TextInfo>
                    <TextInfo>Rua: {dataTanque.logradouro} </TextInfo>
                </BoxEndereco>
            </BoxInfo>
            <BoxMap>
                <MapView
                    style={{ width: '100%', height: '100%' }}
                    initialRegion={{
                        latitude: -6.148043,
                        longitude: -38.195733,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                >

                </MapView>
            </BoxMap>

            <BoxBtnModal>
                <BtnVoltar onPress={onClose}>
                    <BtnText>Voltar</BtnText>
                </BtnVoltar>
            </BoxBtnModal>

        </BoxModal>
    );
}
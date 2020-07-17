import React from 'react'
import { StyleSheet, Text } from 'react-native'
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
                    <TextInfo>Tipo do Leite: <Text style={{ fontWeight: 'normal' }}>{dataTanque.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</Text></TextInfo>
                    <TextInfo>Vol. Atual: <Text style={{ fontWeight: 'normal' }}>{dataTanque.qtdAtual} litros</Text></TextInfo>
                    <TextInfo>Cabem: <Text style={{ fontWeight: 'normal' }}>{dataTanque.qtdRestante} litros</Text></TextInfo>
                    <TextInfo>Responsável: <Text style={{ fontWeight: 'normal' }}>{dataTanque.responsavel.nome}</Text></TextInfo>
                </BoxCaracteristicas>
                <BoxEndereco>
                    <TextInfo>Cidade: <Text style={{ fontWeight: 'normal' }}>{dataTanque.localidade}</Text></TextInfo>
                    <TextInfo>Estado: <Text style={{ fontWeight: 'normal' }}>{dataTanque.uf}</Text></TextInfo>
                    <TextInfo>CEP: <Text style={{ fontWeight: 'normal' }}>{dataTanque.cep}</Text></TextInfo>
                    <TextInfo>Bairro: <Text style={{ fontWeight: 'normal' }}>{dataTanque.bairro}</Text></TextInfo>
                    <TextInfo>Rua: <Text style={{ fontWeight: 'normal' }}>{dataTanque.logradouro}</Text></TextInfo>
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
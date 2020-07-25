import React from 'react'
import { Text } from 'react-native'

import Map from '../../components/Map'
import {
    BoxModal, BoxTitulo, TituloInfo, BoxBtnModal, BtnVoltar, BtnText
} from './styles'

export default function ModalDetalheTanque({ dataTanque, onClose }) {

    return (
        <BoxModal>

            <Map dataMap={dataTanque} />

            <BoxBtnModal>
                <BtnVoltar onPress={onClose}>
                    <BtnText>Voltar</BtnText>
                </BtnVoltar>
            </BoxBtnModal>

        </BoxModal>
    );
}
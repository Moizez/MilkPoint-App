import React from 'react';
import { TouchableOpacity } from 'react-native'

import {
    BoxModal, BoxTitulo, TituloInfo,
    BtnFechar, BtnText, BoxInfo, BoxInfoModal, BtnCancel, Btn, NomeModal
} from './styles'

export default function ModalCancel({ dataTanque, onClose, onCancel }) {
    return (

        <BoxModal>
            <BoxTitulo>
                <TituloInfo>Informação da solicitação: </TituloInfo>
            </BoxTitulo>

            <BoxInfoModal>
                <NomeModal>Tanque: {dataTanque.tanque.nome}</NomeModal>
                <NomeModal>Valor solicitado: {dataTanque.quantidade} litros</NomeModal>
                <NomeModal>Data: {dataTanque.dataNow} às {dataTanque.horaNow}h</NomeModal>
            </BoxInfoModal>

            <BoxTitulo>
                <TituloInfo>Deseja cancelar esta solicitação? </TituloInfo>
            </BoxTitulo>

            <BoxInfo>
                <BtnCancel>
                    <TouchableOpacity onPress={onCancel}>
                        <Btn>Cancelar Solicitação</Btn>
                    </TouchableOpacity>
                </BtnCancel>
            </BoxInfo>

            <BtnFechar onPress={onClose}>
                <BtnText>Fechar</BtnText>
            </BtnFechar>
        </BoxModal>

    );
}
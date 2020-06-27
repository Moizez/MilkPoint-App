import React, { useState } from 'react';
import { View } from 'react-native';

import {
    BoxModal, BoxInfoModal, TituloInfo, InputModal, BoxBtn, BtnConfirm,
    BtnCancel, Button, BtnText
} from './styles'

export default function ModalDepositoRetirada(props) {

    const [quantidade, setQuantidade] = useState(0)

    console.log('QTD: ' + quantidade)

    return (
        <BoxModal>

            <BoxInfoModal>
                <TituloInfo>Solicitação de depósito no tanque</TituloInfo>
                <InputModal
                    placeholder='Quantidade em litros (L)'
                    autoCorrect={false}
                    autoCapitalize='none'
                    keyboardType='numeric'
                    value={quantidade}
                    onChangeText={setQuantidade}
                    onEndEditing={() => props.onConfirme(quantidade)}
                />

                <BoxBtn>
                    <BtnConfirm>
                        <Button onPress={props.onConfirme}>
                            <BtnText>Confirmar</BtnText>
                        </Button>
                    </BtnConfirm>

                    <BtnCancel>
                        <Button onPress={props.onClose}>
                            <BtnText>Cancelar</BtnText>
                        </Button>
                    </BtnCancel>
                </BoxBtn>

            </BoxInfoModal>

        </BoxModal>
    );
}
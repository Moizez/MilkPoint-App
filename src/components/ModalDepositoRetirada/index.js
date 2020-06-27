import React, { useState } from 'react';
import { View } from 'react-native';

import {
    BoxModal, BoxInfoModal, TituloInfo, InputModal, BoxBtn, BtnConfirm,
    BtnCancel, Button, BtnText
} from './styles'

export default function ModalDepositoRetirada(props) {

    const [quantidade, setQuantidade] = useState()

    return (
        <BoxModal>

            <BoxInfoModal>
                <TituloInfo>Digite o valor que deseja solicitar:</TituloInfo>
                <InputModal
                    placeholder='Quantidade em litros (L)'
                    autoCorrect={false}
                    autoCapitalize='none'
                    keyboardType='numeric'
                    value={quantidade}
                    onChangeText={setQuantidade}
                />

                <BoxBtn>
                    <BtnConfirm>
                        <Button onPress={() => props.onConfirme(quantidade)}>
                            <BtnText>Confirmar</BtnText>
                        </Button>
                    </BtnConfirm>

                    <BtnCancel>
                        <Button onPress={() => props.onClose()}>
                            <BtnText>Cancelar</BtnText>
                        </Button>
                    </BtnCancel>
                </BoxBtn>

            </BoxInfoModal>

        </BoxModal>
    );
}
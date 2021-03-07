import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    Container, CloseContainer, ModalBox, CloseButton, ModalHeader, Title, DepositBox,
    DepositInput, DepositButton
} from './styles'

const DepositModal = ({ closeDepositModal, onConfirme }) => {

    const [text, setText] = useState('')

    return (
        <Container>
            <CloseContainer onPress={closeDepositModal} activeOpacity={1} />
            <ModalBox>
                <ModalHeader>
                    <CloseButton onPress={closeDepositModal}>
                        <Icon name='chevron-down' color='#FFF' size={40} />
                    </CloseButton>
                    <Title>Digite o valor do depósito</Title>
                </ModalHeader>

                <DepositBox>
                    <DepositInput
                        placeholder='Valor em litros de leite'
                        autoCorrect={false}
                        autoCapitalize='sentences'
                        keyboardType='phone-pad'
                        value={text}
                        onChangeText={setText}
                    />
                    <DepositButton onPress={() => onConfirme(text)}>
                        <Icon name='basket-fill' color='#FFF' size={35} />
                    </DepositButton>
                </DepositBox>

            </ModalBox>

        </Container>
    );
}

export default DepositModal
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    Container, CloseContainer, ModalBox, CloseButton, ModalHeader, Title, ModalButton,
    WithdrawalBox, WithdrawalInput, WithdrawalButton, TotalWithdrawal, PartialWithdrawal,
    TextButton
} from './styles'

const WithdrawalModal = ({ closeModal, confirmModal, total }) => {

    const [text, setText] = useState('')
    const [show, setShow] = useState(false)

    return (
        <Container>
            <CloseContainer onPress={closeModal} activeOpacity={1} />

            <ModalBox>
                <ModalHeader>
                    <CloseButton onPress={closeModal}>
                        <Icon name='chevron-down' color='#FFF' size={40} />
                    </CloseButton>
                    <Title>Selecione o tipo de retirada</Title>
                </ModalHeader>

                <ModalButton>
                    <PartialWithdrawal onPress={() => setShow(!show)}>
                        <TextButton>Parcial</TextButton>
                        <Icon name='chart-donut' color='#FFF' size={30} />
                    </PartialWithdrawal>

                    <TotalWithdrawal onPress={() => confirmModal(total)}>
                        <TextButton>Total</TextButton>
                        <Icon name='gauge-full' color='#FFF' size={30} />
                    </TotalWithdrawal>
                </ModalButton>

                {show &&
                    <WithdrawalBox>
                        <WithdrawalInput
                            placeholder='Valor em litros de leite'
                            autoCorrect={false}
                            autoCapitalize='sentences'
                            keyboardType='phone-pad'
                            value={text}
                            onChangeText={setText}
                        />
                        <WithdrawalButton onPress={() => confirmModal(text)}>
                            <Icon name='basket-unfill' color='#FFF' size={35} />
                        </WithdrawalButton>
                    </WithdrawalBox>
                }

            </ModalBox>

        </Container>
    );
}

export default WithdrawalModal
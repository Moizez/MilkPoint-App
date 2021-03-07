import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    Container, Modal, ModalBox, CloseButton, ModalHeader, Title, ChosenDateBox, Button15Days,
    Button30Days, ButtonInitialDate, ButtonFinalDate, SearchBox, SearchInput, SearchButton,
    TextButton
} from './styles'

const DepositModal = ({ show, setShow }) => {

    const closeDepositModal = () => setShow(false)

    return (
        <Modal
            transparent={true}
            visible={show}
            animationType='slide'
        >
            <Container>
                <ModalBox>
                    <ModalHeader>
                        <CloseButton onPress={closeDepositModal} >
                            <Icon name='chevron-down' color='#FFF' size={40} />
                        </CloseButton>
                        <Title>Busca avançada</Title>
                    </ModalHeader>

                </ModalBox>

            </Container>

        </Modal>
    );
}

export default DepositModal
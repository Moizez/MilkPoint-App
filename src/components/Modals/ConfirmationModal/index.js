import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'

import {
    Container, CloseContainer, ModalBox, CloseButton, ModalHeader, Title, ModalInfo,
    InfoBox, ItemBox, InfoTitle, InfoText, ConfirmButton, DividerH, DividerV
} from './styles'

const ConfirmationModal = ({ closeModal, data, confirmModal, quantidade }) => {

    //let date = moment(data.dataNow).locale('pt-br').format('D [de] MMM [às] LT[h]')

    return (
        <Container>
            <CloseContainer onPress={closeModal} activeOpacity={1} />
            <ModalBox>
                <ModalHeader>
                    <CloseButton onPress={closeModal}>
                        <Icon name='chevron-down' color='#FFF' size={40} />
                    </CloseButton>
                    <Title>Confirmar esta solicitação?</Title>
                </ModalHeader>

                <ModalInfo>

                    <InfoBox>
                        <ItemBox>
                            <InfoTitle>Tanque</InfoTitle>
                            <InfoText>{data.nome}</InfoText>
                        </ItemBox>
                        <DividerV />
                        <ItemBox>
                            <InfoTitle>Tipo do leite</InfoTitle>
                            <InfoText>{data.tipo === 'CAPRINO' ? 'Caprino' : 'Bovino'}</InfoText>
                        </ItemBox>
                        <DividerV />
                        <ItemBox>
                            <InfoTitle>Quantidade</InfoTitle>
                            <InfoText>{quantidade} litros</InfoText>
                        </ItemBox>
                    </InfoBox>
                </ModalInfo>

                <ConfirmButton onPress={confirmModal}>
                    <Icon name='check-circle' color='#FFF' size={35} />
                </ConfirmButton>

            </ModalBox>

        </Container>
    );
}

const styles = StyleSheet.create({
    divider: {
        marginVertical: 5, height: 2
    },
    dividerV: {
        width: 0.5, height: '100%'
    },
    periodDivider: {
        marginVertical: 5, backgroundColor: 'red'
    }
})

export default ConfirmationModal
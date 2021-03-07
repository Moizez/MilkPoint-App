import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'

import {
    Container, CloseContainer, ModalBox, CloseButton, ModalHeader, Title, ModalInfo,
    InfoBox, ItemBox, InfoTitle, InfoText, CancelButton, DividerH, DividerV
} from './styles'

const CancelModal = ({ closeCancelModal, data, onCancel }) => {

    let date = moment(data.dataNow).locale('pt-br').format('D [de] MMM [às] LT[h]')

    return (
        <Container>
            <CloseContainer onPress={closeCancelModal} activeOpacity={1} />
            <ModalBox>
                <ModalHeader>
                    <CloseButton onPress={closeCancelModal}>
                        <Icon name='chevron-down' color='#FFF' size={40} />
                    </CloseButton>
                    <Title>Deseja realmente cancelar?</Title>
                </ModalHeader>

                <ModalInfo>

                    <InfoBox>
                        <ItemBox>
                            <InfoTitle>Nome do tanque</InfoTitle>
                            <InfoText>{data.tanque.nome}</InfoText>
                            <DividerH />
                        </ItemBox>
                        <DividerV />
                        <ItemBox>
                            <InfoTitle>Tipo do leite</InfoTitle>
                            <InfoText>{data?.tanque.tipo === 'CAPRINO' ? 'Caprino' : 'Bovino'}</InfoText>
                            <DividerH />
                        </ItemBox>
                    </InfoBox>

                    <InfoBox>
                        <ItemBox>
                            <InfoTitle>Valor solicitado</InfoTitle>
                            <InfoText>{data.quantidade} litros</InfoText>
                        </ItemBox>
                        <DividerV />
                        <ItemBox>
                            <InfoTitle>Tipo do leite</InfoTitle>
                            <InfoText>{date}</InfoText>
                        </ItemBox>
                    </InfoBox>

                </ModalInfo>

                <CancelButton onPress={() => { }}>
                    <Icon name='delete-outline' color='#FFF' size={35} />
                </CancelButton>

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

export default CancelModal
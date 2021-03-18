import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Picker } from '@react-native-picker/picker';

import {
    Container, CloseContainer, ModalBox, CloseButton, ModalHeader, Title, ModalInfo,
    InfoBox, ItemBox, InfoTitle, InfoText, DividerV, MessageBox,
    MessageInput, ModalButton, RefuseButton, AcceptButton, TextButton,
    MessageInputBox, MessageItemBox
} from './styles'

const InactiveTankModal = ({ data, confirmModal, closeModal }) => {

    const [text, setText] = useState('')
    const [message] = useState([
        'Selecione um dos motivos...',
        'Aguardando vistoria técnica',
        'Tanque danificado',
        'Em manutenção'
    ])

    return (
        <Container>
            <CloseContainer onPress={closeModal} activeOpacity={1} />
            <ModalBox>
                <ModalHeader>
                    <CloseButton onPress={closeModal}>
                        <Icon name='chevron-down' color='#FFF' size={40} />
                    </CloseButton>
                    <Title>Informações sobre a solicitação</Title>
                </ModalHeader>

                <ModalInfo>

                    <InfoBox>
                        <ItemBox>
                            <InfoTitle>Tanque</InfoTitle>
                            <InfoText>{data.nomeTanque}</InfoText>
                        </ItemBox>
                        <DividerV />
                        <ItemBox>
                            <InfoTitle>Responsável</InfoTitle>
                            <InfoText>{data.nomeResponsavel}</InfoText>
                        </ItemBox>
                    </InfoBox>

                </ModalInfo>

                <MessageBox>
                    <MessageItemBox>
                        <Picker
                            selectedValue={text}
                            style={{ height: 30, width: '100%' }}
                            prompt='Qual o motivo da inativação?'
                            onValueChange={(itemValue, itemIndex) =>
                                itemIndex != 0 && setText(itemValue)
                            }>
                            {message.map(i => {
                                return <Picker.Item label={i} value={i} color={i} />
                            })}
                        </Picker>
                    </MessageItemBox>

                    <MessageInputBox>
                        <MessageInput
                            placeholder='Por favor, informe o motivo'
                            autoCorrect={true}
                            autoCapitalize='sentences'
                            multiline={true}
                            value={text}
                            onChangeText={setText}
                        />
                    </MessageInputBox>

                    <ModalButton>
                        <RefuseButton onPress={() => { setText(''), closeModal() }}>
                            <TextButton>Fechar</TextButton>
                            <Icon name='close-circle' color='#FFF' size={30} />
                        </RefuseButton>

                        <AcceptButton onPress={() => confirmModal(text)}>
                            <TextButton>Confirmar</TextButton>
                            <Icon name='check-circle' color='#FFF' size={30} />
                        </AcceptButton>
                    </ModalButton>

                </MessageBox>

            </ModalBox>

        </Container>
    );
}

export default InactiveTankModal
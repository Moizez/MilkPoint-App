import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import PickerSelect from '../../Picker'
import { Picker } from '@react-native-picker/picker';
import moment from 'moment'

import {
    Container, CloseContainer, ModalBox, CloseButton, ModalHeader, Title, ModalInfo,
    InfoBox, ItemBox, InfoTitle, InfoText, DividerH, DividerV, MessageBox,
    MessageInput, ModalButton, RefuseButton, AcceptButton, TextButton,
    MessageInputBox, MessageItemBox, MessageText
} from './styles'

const AcceptOrRefuseModal = ({ closeModal, data, confirmModal }) => {

    let date = moment(data.dataNow).locale('pt-br').format('D [de] MMM [às] LT[h]')

    const [text, setText] = useState('')
    const [show, setShow] = useState(false)
    const [selectedMessage, setSelectedMessage] = useState([])
    const [message] = useState([
        'Qual o motivo da recusa?', '#c1121f',
        'Tanque em manutenção',
        'Leite reprovado no teste de água',
        'Leite reprovado no teste de alizarol'
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

                {!show &&
                    <ModalInfo>

                        <InfoBox>
                            <ItemBox>
                                <InfoTitle>Nome do Produtor</InfoTitle>
                                <InfoText>{data.produtor.nome}</InfoText>
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
                                <InfoTitle>Data do pedido</InfoTitle>
                                <InfoText>{date}</InfoText>
                            </ItemBox>
                        </InfoBox>

                    </ModalInfo>
                }

                {show &&
                    <MessageBox>
                        <MessageItemBox>
                            <Picker
                                selectedValue={text}
                                style={{ height: 30, width: '100%' }}
                                prompt='Qual o motivo da recusa?'
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
                            <RefuseButton onPress={() => setShow(!show)}>
                                <TextButton>Fechar</TextButton>
                                <Icon name='close-circle' color='#FFF' size={30} />
                            </RefuseButton>

                            <AcceptButton onPress={() => confirmModal()}>
                                <TextButton>Confirmar</TextButton>
                                <Icon name='check-circle' color='#FFF' size={30} />
                            </AcceptButton>
                        </ModalButton>

                    </MessageBox>
                }

                {!show &&
                    <ModalButton>
                        <RefuseButton onPress={() => setShow(!show)}>
                            <TextButton>Recusar</TextButton>
                            <Icon name='delete-circle' color='#FFF' size={30} />
                        </RefuseButton>

                        <AcceptButton onPress={() => confirmModal()}>
                            <TextButton>Aceitar</TextButton>
                            <Icon name='check-circle' color='#FFF' size={30} />
                        </AcceptButton>
                    </ModalButton>
                }

            </ModalBox>

        </Container>
    );
}

export default AcceptOrRefuseModal
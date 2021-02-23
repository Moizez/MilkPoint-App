import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native'
import { Modal } from 'react-native'

import {
    Container, Menu, InfoButton, ContainerModal, InfoContainer,
    BoxBtnModal, BtnFechar, BtnText, HeaderModal, InfoBox, InfoText, Info
} from './styles'


export default function MenuButton() {

    const navigation = useNavigation()

    const [isVisible, setVisible] = useState(false)

    return (
        <Container>
            <Menu onPress={() => navigation.toggleDrawer()} >
                <Icon name='menu' color='#FFF' size={35} />
            </Menu>
            <InfoButton onPress={() => setVisible(!isVisible)}>
                <Icon name='info-with-circle' color='#FFF' size={20} />
            </InfoButton>

            <Modal
                animationType='slide'
                transparent={true}
                visible={isVisible}
            >
                <ContainerModal>
                    <InfoContainer>
                        <HeaderModal>
                            <BtnText>Informações Importantes</BtnText>
                        </HeaderModal>

                        <InfoBox>
                            <Info>
                                <Icon name='triangle-right' color='#000' size={25} />
                                <InfoText>Ao clicar no card do tanque, abrirá uma nova tela com detalhes
                                sobre ele e a opção de realizar um depósito ou retirada;</InfoText>
                            </Info>
                            <Info>
                                <Icon name='triangle-right' color='#000' size={25} />
                                <InfoText>Nas telas dos tanques, dos depósitos e retiradas pendentes
                                e no histórico, basta clicar no topo da lista e arrastar para
                                baixo para atualizar;</InfoText>
                            </Info>
                            <Info>
                                <Icon name='triangle-right' color='#000' size={25} />
                                <InfoText>O ícone do calendário permite filtrar a exibição de depósitos
                                e retiradas a partir da data em que foi realizada a ação;</InfoText>
                            </Info>
                            <Info>
                                <Icon name='triangle-right' color='#000' size={25} />
                                <InfoText>Para cancelar um depósito ou retirada, basta clicar por alguns segundos
                                sobre o ícone na tela de dependentes e confirmar o cancelamento;</InfoText>
                            </Info>
                            <Info>
                                <Icon name='triangle-right' color='#000' size={25} />
                                <InfoText>Os depósitos e retiradas terão três tipos de status: confirmado {<Icon name='bucket' color='#2a9d8f' size={20} />}, cancelado {<Icon name='bucket' color='#da1e37' size={20} />} e
                                pendente {<Icon name='bucket' color='#adb5bd' size={20} />}.</InfoText>
                            </Info>
                        </InfoBox>

                        <BoxBtnModal>
                            <BtnFechar onPress={() => setVisible(!isVisible)}>
                                <BtnText>Fechar</BtnText>
                            </BtnFechar>
                        </BoxBtnModal>

                    </InfoContainer>

                </ContainerModal>
            </Modal>

        </Container>


    );
}
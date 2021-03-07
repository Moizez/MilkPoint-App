import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    Container, Modal, ModalBox, CloseButton, ModalHeader, Title, ChosenDateBox, Button15Days,
    Button30Days, ButtonInitialDate, ButtonFinalDate, SearchBox, SearchInput, SearchButton,
    TextButton
} from './styles'

const DateModal = ({ show, setShow }) => {

    const [text, setText] = useState('')

    const closeDateModal = () => setShow(false)

    return (

        <Modal
            transparent={true}
            visible={show}
            animationType='slide'
        >
            <Container>
                <ModalBox>
                    <ModalHeader>
                        <CloseButton onPress={closeDateModal} >
                            <Icon name='chevron-down' color='#FFF' size={40} />
                        </CloseButton>
                        <Title>Busca avançada</Title>
                    </ModalHeader>

                    <ChosenDateBox>
                        <Button15Days>
                            <Icon name='calendar-range' color='#FFF' size={35} />
                            <TextButton>Útimos 15 dias</TextButton>
                        </Button15Days>
                        <Button30Days>
                            <Icon name='calendar-month' color='#FFF' size={35} />
                            <TextButton>Útimos 30 dias</TextButton>
                        </Button30Days>
                    </ChosenDateBox>

                    <ChosenDateBox>
                        <ButtonInitialDate>
                            <Icon name='calendar-arrow-right' color='#FFF' size={35} />
                            <TextButton>Data inicial</TextButton>
                        </ButtonInitialDate>
                        <ButtonFinalDate>
                            <Icon name='calendar-arrow-left' color='#FFF' size={35} />
                            <TextButton>Data final</TextButton>
                        </ButtonFinalDate>
                    </ChosenDateBox>

                    <SearchBox>
                        <SearchInput
                            placeholder='Digite um valor de depósito'
                            autoCorrect={false}
                            autoCapitalize='sentences'
                            keyboardType='phone-pad'
                            value={text}
                            onChangeText={setText}
                        />
                        <SearchButton>
                            <Icon name='magnify' color='#FFF' size={35} />
                        </SearchButton>
                    </SearchBox>

                </ModalBox>

            </Container>

        </Modal>

    );
}

export default DateModal
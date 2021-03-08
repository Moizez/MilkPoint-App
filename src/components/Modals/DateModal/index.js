import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import 'moment/locale/pt-br'

import DatePicker from '../../DatePicker'

import {
    Container, CloseContainer, ModalBox, CloseButton, ModalHeader, Title, ChosenDateBox,
    Button15Days, Button30Days, ButtonInitialDate, ButtonFinalDate, SearchBox, SearchInput,
    SearchButton, TextButton,
} from './styles'

const DateModal = ({
    closeModal, filterByQuantityLiters, filterByLast15Days, filterByLast30Days, filterByTwoDates
}) => {

    const [text, setText] = useState('')
    const [showInitialPicker, setShowInitialPicker] = useState(false)
    const [showFinalPicker, setShowFinalPicker] = useState(false)
    const [selectedInitialDate, setSelectedInitialDate] = useState(new Date())
    const [selectedFinalDate, setSelectedFinalDate] = useState(new Date())

    let today = moment(selectedInitialDate).startOf('date').locale('pt').format('L')
    let today2 = moment(selectedFinalDate).startOf('date').locale('pt').format('L')


    const onInitialChange = (currentDate) => {
        setShowInitialPicker(Platform.OS === 'ios')
        let initialDate = moment(currentDate).startOf('date').locale('en').format('L')
        setSelectedInitialDate(initialDate)
    }

    const onFinalChange = (currentDate) => {
        setShowFinalPicker(Platform.OS === 'ios')
        let finalDate = moment(currentDate).startOf('date').locale('en').format('L')
        setSelectedFinalDate(finalDate)
        filterByTwoDates(selectedInitialDate, selectedFinalDate)
    }

    return (
        <Container>
            <CloseContainer onPress={closeModal} activeOpacity={1} />
            <ModalBox>
                <ModalHeader>
                    <CloseButton onPress={closeModal} >
                        <Icon name='chevron-down' color='#FFF' size={40} />
                    </CloseButton>
                    <Title>Busca avançada</Title>
                </ModalHeader>

                <ChosenDateBox>
                    <Button15Days onPress={() => { filterByLast15Days(), closeModal() }}>
                        <Icon name='calendar-range' color='#FFF' size={35} />
                        <TextButton>Útimos 15 dias</TextButton>
                    </Button15Days>

                    <Button30Days onPress={() => { filterByLast30Days(), closeModal() }}>
                        <Icon name='calendar-month' color='#FFF' size={35} />
                        <TextButton>Útimos 30 dias</TextButton>
                    </Button30Days>
                </ChosenDateBox>

                <ChosenDateBox>
                    <ButtonInitialDate onPress={() => setShowInitialPicker(true)}>
                        <Icon name='calendar-arrow-right' color='#FFF' size={35} />
                        <TextButton>{selectedInitialDate ? today : 'Data inicial'}</TextButton>
                    </ButtonInitialDate>

                    <ButtonFinalDate onPress={() => setShowFinalPicker(true)}>
                        <Icon name='calendar-arrow-left' color='#FFF' size={35} />
                        <TextButton>{selectedFinalDate ? today2 : 'Data final'}</TextButton>
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
                    <SearchButton onPress={() => { filterByQuantityLiters(text), closeModal() }}>
                        <Icon name='magnify' color='#FFF' size={35} />
                    </SearchButton>
                </SearchBox>

            </ModalBox>

            {showInitialPicker &&
                <DatePicker
                    chosenDate={selectedInitialDate}
                    onChange={onInitialChange}
                    display='spinner'
                />
            }

            {showFinalPicker &&
                <DatePicker
                    chosenDate={selectedFinalDate}
                    onChange={onFinalChange}
                    display='spinner'
                />
            }

        </Container>
    );
}

export default DateModal
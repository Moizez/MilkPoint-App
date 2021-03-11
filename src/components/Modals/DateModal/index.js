import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import 'moment/locale/pt-br'

import DatePicker from '../../DatePicker'

import {
    Container, CloseContainer, ModalBox, CloseButton, ModalHeader, Title, ChosenDateBox,
    Button15Days, Button30Days, ButtonInitialDate, ButtonFinalDate, SearchBox, SearchInput,
    SearchButton, TextButton, SearchDateBox, SearchDateButton, InfoInitialButton,
    InfoFinalButton, TextDateButton
} from './styles'

const DateModal = ({
    closeModal, filterByQuantityLiters, filterByLast15Days, filterByLast30Days,
    filterByTwoDates, openWarning
}) => {

    const [text, setText] = useState('')
    const [showInitialPicker, setShowInitialPicker] = useState(false)
    const [showFinalPicker, setShowFinalPicker] = useState(false)
    const [selectedInitialDate, setSelectedInitialDate] = useState(null)
    const [selectedFinalDate, setSelectedFinalDate] = useState(null)

    let initialDate = moment(selectedInitialDate).locale('pt').format('L')
    let finalDate = moment(selectedFinalDate).locale('pt').format('L')

    const onInitialChange = (currentDate) => {
        setShowInitialPicker(Platform.OS === 'ios')
        setSelectedInitialDate(currentDate)
    }

    const onFinalChange = (currentDate) => {
        setShowFinalPicker(Platform.OS === 'ios')
        setSelectedFinalDate(currentDate)
    }

    const openInitialDate = () => {
        setSelectedInitialDate(new Date())
        setShowInitialPicker(true)
    }

    const openFinalDate = () => {
        setSelectedFinalDate(new Date())
        setShowFinalPicker(true)
    }

    const handleSearchTwoDates = () => {
        if (!selectedInitialDate) {
            openWarning('A data inicial é obrigatória')
        } else {
            filterByTwoDates(selectedInitialDate, selectedFinalDate)
            closeModal()
        }
    }

    const handleSearchValue = () => {
        if (isNaN(text) || text <= 0) {
            openWarning('Digite um valor válido!')
        } else {
            filterByQuantityLiters(text)
            closeModal()
        }
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
                    <ButtonInitialDate onPress={() => openInitialDate()}>
                        <Icon name='calendar-arrow-right' color='#FFF' size={35} />
                        <TextButton>Data inicial</TextButton>
                    </ButtonInitialDate>

                    <ButtonFinalDate onPress={() => openFinalDate()}>
                        <Icon name='calendar-arrow-left' color='#FFF' size={35} />
                        <TextButton>Data final</TextButton>
                    </ButtonFinalDate>
                </ChosenDateBox>

                {selectedInitialDate == null && selectedFinalDate == null &&
                    <SearchBox>
                        <SearchInput
                            placeholder='Digite um valor de depósito'
                            autoCorrect={false}
                            autoCapitalize='sentences'
                            keyboardType='phone-pad'
                            value={text}
                            onChangeText={setText}
                        />
                        <SearchButton onPress={handleSearchValue}>
                            <Icon name='magnify' color='#FFF' size={35} />
                        </SearchButton>
                    </SearchBox>
                }

                {(selectedInitialDate || selectedFinalDate) &&
                    <SearchDateBox>
                        {selectedInitialDate &&
                            <InfoInitialButton onPress={() => setSelectedInitialDate(null)}>
                                <TextDateButton>{initialDate}</TextDateButton>
                                <Icon name='close-circle' color='#FFF' size={20} />
                            </InfoInitialButton>
                        }
                        {selectedFinalDate &&
                            <InfoFinalButton onPress={() => setSelectedFinalDate(null)}>
                                <TextDateButton>{finalDate}</TextDateButton>
                                <Icon name='close-circle' color='#FFF' size={20} />
                            </InfoFinalButton>
                        }

                        <SearchDateButton onPress={handleSearchTwoDates}>
                            <Icon name='calendar-search' color='#FFF' size={35} />
                        </SearchDateButton>
                    </SearchDateBox>
                }

            </ModalBox>

            {showInitialPicker &&
                <DatePicker
                    chosenDate={selectedInitialDate}
                    onSet={onInitialChange}
                    onCancel={setSelectedInitialDate}
                    display='spinner'
                />
            }

            {showFinalPicker &&
                <DatePicker
                    chosenDate={selectedFinalDate}
                    onSet={onFinalChange}
                    display='spinner'
                />
            }

        </Container>
    );
}

export default DateModal
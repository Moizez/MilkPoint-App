import React, { useState, useEffect } from 'react'
import { RefreshControl, Platform, Modal } from 'react-native'
import styled from 'styled-components/native'
import moment from 'moment'

import HistoricCard from '../../../../components/Cards/HistoricCard'
import Loader from '../../../../components/Loader'
import WarningModal from '../../../../components/Modals/WarningModal'
import { Fab } from '../../../../components/Fab'
import DatePicker from '../../../../components/DatePicker'
import EmptyListCard from '../../../../components/Cards/EmptyListCard'

import {
    filterSpecificDay, filterByDateInterval, filterByBetweenDates
} from '../../../../components/Helpers'

const ConfirmedDeposits = ({ data, loading, load }) => {

    const [isRefreshing, setIsRefreshing] = useState(false)
    const [datePicker, setDatePicker] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [selectedDate, setSelectedDate] = useState(moment())
    const [mainData, setMainData] = useState([])

    useEffect(() => {
        const loadPage = async () => {
            const result = await filterSpecificDay(moment(), data)
            setMainData(result)
        }
        loadPage()
    }, [])

    const filterByQuantityLiters = (value) => {
        const result = data.filter(i => i.quantidade == value)
        setMainData(result)
    }

    const filterByLast15Days = () => {
        const result = filterByDateInterval(15, 'days', data)
        setMainData(result)
    }

    const filterByLast30Days = () => {
        const result = filterByDateInterval(1, 'month', data)
        setMainData(result)
    }

    const filterByTwoDates = (initialDate, finalDate) => {
        const date = finalDate ? finalDate : moment()
        const result = filterByBetweenDates(data, initialDate, date)
        setMainData(result)
    }

    const onChange = async (currentDate) => {
        setDatePicker(Platform.OS === 'ios')
        let date = currentDate ? currentDate : moment()
        const result = await filterSpecificDay(date, data)
        setSelectedDate(date)
        setMainData(result)
    }

    const onRefreshList = () => {
        setIsRefreshing(true)
        setSelectedDate(moment())
        load()
        setIsRefreshing(false)
    }

    const openWarningModal = (message) => {
        setTypeMessage(message)
        setWarningModal(true)
    }

    const closeWarningModal = () => setWarningModal(false)

    return (
        <Container>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={mainData}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <HistoricCard data={item} />}
                ListEmptyComponent={
                    <EmptyListCard
                        iconLeft={'gesture-swipe-down'}
                        iconRight={'calendar-search'}
                        infoLeft={'Clique e arraste para atualizar a lista.'}
                        infoRight={'Clique no ícone do calendário para filtrar a lista.'}
                    />
                }
            />
            {loading && <Loader />}

            {datePicker &&
                <DatePicker
                    chosenDate={selectedDate}
                    onSet={onChange}
                />
            }

            <Fab
                setShowDatePicker={setDatePicker}
                filterByQuantityLiters={filterByQuantityLiters}
                filterByLast15Days={filterByLast15Days}
                filterByLast30Days={filterByLast30Days}
                filterByTwoDates={filterByTwoDates}
                openWarning={openWarningModal}
                type={true}
            />

            <Modal
                animationType='fade'
                transparent={true}
                visible={warningModal}
            >
                <WarningModal
                    closeModal={closeWarningModal}
                    message={typeMessage}
                    lottie={require('../../../../assets/lottie/error-icon.json')}
                    bgColor={false}
                />
            </Modal>

        </Container>
    );
}

export default ConfirmedDeposits

const Container = styled.View`
    flex: 1;
    background-color: #292b2c;
`;
const FlatList = styled.FlatList`
    flex: 1;
    background-color: #FFF;
`;
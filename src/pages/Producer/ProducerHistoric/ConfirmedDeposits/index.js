import React, { useState, useEffect, Fragment } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RefreshControl, Platform, Modal } from 'react-native'

import Api from '../../../../services/producer.api'

import CardHistorico from '../../../../components/CardHistorico'
import Loader from '../../../../components/Loader'
import Fab from '../../../../components/Fab'
import DatePicker from '../../../../components/DatePicker'
import DateModal from '../../../../components/Modals/DateModal'
import { filterToday, filterByDateInterval, filterByBetweenDates } from '../../../../components/Helpers'

import {
    BoxNomeAviso, NomeAviso, List, BoxIconAviso, BoxIconUpdate, BoxIconDelete
} from '../styles'

const ConfirmedDeposits = () => {

    const [isRefreshing, setIsRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dateModal, setDateModal] = useState(false)
    const [datePicker, setDatePicker] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())

    const [depositResolved, setdepositResolved] = useState([])
    const [mainData, setMainData] = useState([])

    const getDepositsResolvedByUser = async () => {
        setLoading(true)
        const response = await Api.getAllDepositsConfirmedOrCanceledUser('confirmados')
        const result = filterToday(selectedDate, response)
        setMainData(result)
        setdepositResolved(response)
        setLoading(false)
    }

    const filterByQuantityLiters = (value) => {
        setLoading(true)
        const result = depositResolved.filter(i => i.quantidade == value)
        setMainData(result)
        setLoading(false)
    }

    const filterByLast15Days = () => {
        const result = filterByDateInterval(15, 'days', depositResolved)
        setMainData(result)
    }

    const filterByLast30Days = () => {
        const result = filterByDateInterval(1, 'month', depositResolved)
        setMainData(result)
    }

    const filterByTwoDates = (initialDate, finalDate) => {
        const date = finalDate ? finalDate : new Date()
        const result = filterByBetweenDates(depositResolved, initialDate, date)
        setMainData(result)
    }

    useEffect(() => {
        getDepositsResolvedByUser()
    }, [])

    const onChange = (currentDate) => {
        setDatePicker(Platform.OS === 'ios')
        setSelectedDate(currentDate)
    }

    const onRefreshList = () => {
        setIsRefreshing(true)
        getDepositsResolvedByUser()
        setIsRefreshing(false)
    }

    const closeDateModal = () => setDateModal(false)
    const openDateModal = () => setDateModal(true)

    return (
        <Fragment>
            <List
                showsVerticalScrollIndicator={false}
                data={mainData}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <CardHistorico data={item} />}
                ListEmptyComponent={
                    <BoxNomeAviso>
                        <NomeAviso style={{ marginBottom: 70 }}>Não há registros!</NomeAviso>
                        <NomeAviso style={{ marginBottom: 15 }}>{<Icon name='lightbulb-on-outline' color='#adb5bd' size={25} />} Dicas</NomeAviso>
                        <BoxIconAviso>
                            <BoxIconUpdate>
                                <Icon name='gesture-swipe-down' color='#adb5bd' size={60} />
                                <NomeAviso>Clique e arraste para atualizar as transações</NomeAviso>
                            </BoxIconUpdate>
                            <BoxIconDelete>
                                <Icon name='calendar-search' color='#adb5bd' size={60} />
                                <NomeAviso>Clique no ícone do calendário para filtrar por data</NomeAviso>
                            </BoxIconDelete>
                        </BoxIconAviso>
                    </BoxNomeAviso>
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
                bgColor={{ backgroundColor: '#2a9d8f' }}
                openModal={openDateModal}
                setShowDatePicker={setDatePicker}
            />

            <Modal
                transparent={true}
                visible={dateModal}
                animationType='slide'
            >
                <DateModal
                    closeModal={closeDateModal}
                    filterByQuantityLiters={filterByQuantityLiters}
                    filterByLast15Days={filterByLast15Days}
                    filterByLast30Days={filterByLast30Days}
                    filterByTwoDates={filterByTwoDates}
                />
            </Modal>

        </Fragment>
    );
}

export default ConfirmedDeposits
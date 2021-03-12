import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RefreshControl, Platform, Modal } from 'react-native'
import moment from 'moment'

import Api from '../../../../services/responsable.api'

import HistoricCard from '../../../../components/Cards/HistoricCard'
import Loader from '../../../../components/Loader'
import WarningModal from '../../../../components/Modals/WarningModal'
import { FabGroup } from '../../../../components/Fab'
import DatePicker from '../../../../components/DatePicker'
import DateModal from '../../../../components/Modals/DateModal'
import {
    filterSpecificDay, filterByDateInterval, filterByBetweenDates
} from '../../../../components/Helpers'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso, BoxIconUpdate, BoxIconDelete
} from '../styles'

const HistoricDeposits = () => {

    const [isRefreshing, setIsRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dateModal, setDateModal] = useState(false)
    const [datePicker, setDatePicker] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date())

    const [status, setStatus] = useState('confirmados')
    const [dataResolved, setDataResolved] = useState([])
    const [mainData, setMainData] = useState([])

    const openWarningModal = (message) => {
        setTypeMessage(message)
        setWarningModal(true)
    }
    const closeWarningModal = () => setWarningModal(false)

    const getDepositsResolvedByUser = async () => {
        setLoading(true)
        const response = await Api.getAllDepositsOrWithdrawalsResolved('deposito')
        setDataResolved(response)
        setLoading(false)
    }

    useEffect(() => {
        getDepositsResolvedByUser()
    }, [])

    const loadPage = async () => {
        const response = await Api.getAllDepositsConfirmedOrCanceledUser(status)
        const result = await filterSpecificDay(selectedDate, response)
        setMainData(result)
    }

    useEffect(() => {
        loadPage()
    }, [status, selectedDate])

    const filterByName = async (value) => {
        const result = await Api.findByNameProducerOrDairy('deposito', value)
        setMainData(result)
    }

    const filterByLast15Days = () => {
        const result = filterByDateInterval(15, 'days', dataResolved)
        setMainData(result)
    }

    const filterByLast30Days = () => {
        const result = filterByDateInterval(1, 'month', dataResolved)
        setMainData(result)
    }

    const filterByTwoDates = (initialDate, finalDate) => {
        const date = finalDate ? finalDate : moment()
        const result = filterByBetweenDates(dataResolved, initialDate, date)
        setMainData(result)
    }

    const onChange = (currentDate) => {
        setDatePicker(Platform.OS === 'ios')
        let date = currentDate ? currentDate : moment()
        setSelectedDate(date)
    }

    const onRefreshList = () => {
        setIsRefreshing(true)
        setSelectedDate(moment())
        setIsRefreshing(false)
    }

    const closeDateModal = () => setDateModal(false)
    const openDateModal = () => setDateModal(true)

    return (
        <Container>
            <List
                showsVerticalScrollIndicator={false}
                data={mainData}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <HistoricCard data={item} />}
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
                initialNumToRender={10}
                maxToRenderPerBatch={10}
            />
            {loading && <Loader />}

            {datePicker &&
                <DatePicker
                    chosenDate={selectedDate}
                    onSet={onChange}
                />
            }

            <FabGroup
                bgColor={{ backgroundColor: status === 'confirmados' ? '#2a9d8f' : '#cc444b' }}
                openModal={openDateModal}
                setShowDatePicker={setDatePicker}
                changeStatus={setStatus}
            />

            <Modal
                transparent={true}
                visible={dateModal}
                animationType='slide'
            >
                <DateModal
                    closeModal={closeDateModal}
                    filterByName={filterByName}
                    filterByLast15Days={filterByLast15Days}
                    filterByLast30Days={filterByLast30Days}
                    filterByTwoDates={filterByTwoDates}
                    isLoading={setLoading}
                    openWarning={openWarningModal}
                />
            </Modal>

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

export default HistoricDeposits
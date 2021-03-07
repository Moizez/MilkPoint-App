import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RefreshControl, Platform, Modal } from 'react-native'

import Api from '../../../../services/producer.api'

import CardHistorico from '../../../../components/CardHistorico'
import Loader from '../../../../components/Loader'
import Fab from '../../../../components/Fab'
import DatePicker from '../../../../components/DatePicker'
import DateModal from '../../../../components/Modals/DateModal'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso, BoxIconUpdate, BoxIconDelete
} from '../styles'

const ConfirmedDeposits = () => {

    const [isRefreshing, setIsRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dateModal, setDateModal] = useState(false)
    const [depositResolved, setdepositResolved] = useState([])

    const [datePicker, setDatePicker] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())

    const getDepositsResolvedByUser = async () => {
        setLoading(true)
        const response = await Api.getAllDepositsConfirmedOrCanceledUser('confirmados')
        setdepositResolved(response)
        setLoading(false)
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
        setIsRefreshing(false)
    }

    const closeDateModal = () => setDateModal(false)
    const openDateModal = () => setDateModal(true)

    return (
        <>
            <List
                showsVerticalScrollIndicator={false}
                data={depositResolved}
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
                    onChange={onChange}
                />
            }

            <Fab
                bgColor={{ backgroundColor: '#2a9d8f' }}
                openDateModal={openDateModal}
                setShowDatePicker={setDatePicker}
            />

            <Modal
                transparent={true}
                visible={dateModal}
                animationType='slide'
            >
                <DateModal
                    show={dateModal}
                    closeDateModal={closeDateModal}
                />
            </Modal>

        </>
    );
}

export default ConfirmedDeposits
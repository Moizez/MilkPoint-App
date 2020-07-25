import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'

import CardHistorico from '../../../components/CardHistorico'
import Header from '../../../components/Header'
import DatePicker from '../../../components/DatePicker'
import FabSearch from '../../../components/FabSearch'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso, BoxIconUpdate, BoxIconDelete
} from './styles'

export default function TelaHistoricoLaticinio() {

    const { user, loadListRetiradas, retirada } = useContext(AuthContext)
    const [dataRetirada, setDataRetirada] = useState([])

    const [show, setShow] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [isTitle, setTitle] = useState(false)

    //Filtrar por usuário e status
    const laticinio = r => r.laticinio.id == user.id
    const status = r => r.confirmacao != false || r.excluido != false
    const retiradas = retirada.filter(laticinio).filter(status)

    //Filtrar por valor do pedido
    async function getValor(value) {
        const filterByValue = await retiradas.filter(function (v) {
            return v.quantidade == value
        })
        setTitle(true)
        setDataRetirada(filterByValue)
        return dataRetirada
    }

    //Lista de todas as retiradas pela data
    const checkDate = async () => {
        let day = moment(selectedDate).format('L')
        const dayRetirada = await retiradas.filter(function (r) {
            let dayRet = moment(r.dataNow).format('L')
            return dayRet === day
        })
        setTitle(false)
        setDataRetirada(dayRetirada)
        return dataRetirada
    }

    useEffect(() => {
        checkDate()
        loadListRetiradas()
    }, [selectedDate])

    function onChange(value) {
        setShow(Platform.OS === 'ios')
        setSelectedDate(value)
    }

    async function onRefreshList() {
        setIsRefreshing(true)
        await checkDate(selectedDate)
        setIsRefreshing(false)
    }

    const showCalendar = () => { setShow(true) }

    return (
        <Container>
            <Header
                nameList={isTitle ?
                    'Lista de transações pelo valor da retirada' :
                    `Lista de transações do dia ${selectedDate && moment(selectedDate).format('L')}`}
                onOpen={showCalendar}
                calendar={<Icon name='calendar-month' color='#FFF' size={22} />}
            />

            <List
                showsVerticalScrollIndicator={false}
                data={dataRetirada}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <CardHistorico data={item} />}
                ListEmptyComponent={
                    <BoxNomeAviso>
                        <NomeAviso style={{ marginBottom: 70 }}>Não há registro de transações!</NomeAviso>
                        <NomeAviso style={{ marginBottom: 15 }}>{<Icon name='lightbulb-on-outline' color='#adb5bd' size={25} />} Dicas</NomeAviso>
                        <BoxIconAviso>
                            <BoxIconUpdate>
                                <Icon name='gesture-swipe-down' color='#adb5bd' size={60} />
                                <NomeAviso>Clique e arraste para atualizar as transações</NomeAviso>
                            </BoxIconUpdate>
                            <BoxIconDelete>
                                <Icon name='calendar' color='#adb5bd' size={60} />
                                <NomeAviso>Clique no ícone do calendário para filtrar por data</NomeAviso>
                            </BoxIconDelete>
                        </BoxIconAviso>
                    </BoxNomeAviso>}
            />

            {
                show && (
                    <DatePicker
                        date={selectedDate}
                        onChange={onChange}
                    />)
            }

            <FabSearch
                getValor={getValor}
                onOpen={showCalendar}
            />

        </Container>
    );
}

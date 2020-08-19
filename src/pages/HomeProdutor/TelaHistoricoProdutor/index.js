import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import 'moment/locale/pt-br'

import CardHistorico from '../../../components/CardHistorico'
import Header from '../../../components/Header'
import DatePicker from '../../../components/DatePicker'
import FabSearch from '../../../components/FabSearch'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso, BoxIconUpdate, BoxIconDelete
} from './styles'

export default function TelaHistoricoProdutor() {

    const { user, loadListDepositos, deposito } = useContext(AuthContext)
    const [dataDeposito, setDataDeposito] = useState([])

    const [show, setShow] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [customDate, setCustomDate] = useState()
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [msg, setMsg] = useState('')

    let msgDefault = `Lista de transações do dia ${selectedDate && moment(selectedDate).format('L')}`
    let msgForValue = 'Lista de transações pelo valor do depósito'
    let msg15Days = 'Lista de transações dos últimos 15 dias'
    let msg30Days = 'Lista de transações dos últimos 30 dias'
    let msgCustomDays = 'Lista de DEPÓSITOS personalizada'


    //Filtrar por usuário e status
    const produtor = d => d.produtor.id == user.id
    const status = d => d.confirmacao != false || d.excluido != false
    const depositos = deposito.filter(produtor).filter(status)

    //Filtrar por valor do pedido
    async function getValor(value) {
        const filterByValue = await depositos.filter(function (v) {
            return v.quantidade == value
        })
        setMsg(msgForValue)
        setDataDeposito(filterByValue)
        return dataDeposito
    }

    //Filtrar pelos últimos 15 dias
    const filterFifteenDays = async () => {
        let fifteenDays = moment().locale('en').subtract(15, 'days').format('L')
        const fifteenDaysAgo = await depositos.filter(function (d) {
            let dayDep = moment(d.dataNow).locale('en').format('L')
            return moment(dayDep).isSameOrAfter(fifteenDays, 'days')
        })
        setMsg(msg15Days)
        setDataDeposito(fifteenDaysAgo)
        return dataDeposito
    }

    //Filtrar pelos últimos 30 dias
    const filterOneMonth = async () => {
        let oneMonth = moment().locale('en').subtract(1, 'month').format('L')
        const oneMonthAgo = await depositos.filter(function (d) {
            let dayDep = moment(d.dataNow).locale('en').format('L')
            return moment(dayDep).isSameOrAfter(oneMonth, 'days')
        })
        setMsg(msg30Days)
        setDataDeposito(oneMonthAgo)
        return dataDeposito
    }

    //Filtrar por data personalizada
    const filterCustomDays = async (value) => {
        setCustomDate(value)
        let customDay = moment(value).locale('en').format('L')
        const customDayAgo = await depositos.filter(function (d) {
            let dayDep = moment(d.dataNow).locale('en').format('L')
            return moment(dayDep).isSameOrAfter(customDay, 'days')
        })
        setMsg(msgCustomDays)
        setDataDeposito(customDayAgo)
        return dataDeposito
    }

    //Lista de todos os depósitos pela data selecionada
    const checkDate = async () => {
        let day = moment(selectedDate).format('L')
        const dayDeposito = await depositos.filter(function (d) {
            let dayDep = moment(d.dataNow).format('L')
            return dayDep === day
        })
        setMsg(msgDefault)
        setDataDeposito(dayDeposito)
        return dataDeposito
    }

    useEffect(() => {
        checkDate()
        loadListDepositos()
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

    const showCalendar = () => setShow(true)

    return (
        <Container>
            <Header
                msg={msg}
                onOpen={showCalendar}
                calendar={<Icon name='calendar-month' color='#FFF' size={22} />}
            />

            <List
                showsVerticalScrollIndicator={false}
                data={dataDeposito}
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
                styleFab={{ backgroundColor: '#292b2c', borderWidth: 2, borderColor: '#FFF' }}
                getValor={getValor}
                filterFifteenDays={filterFifteenDays}
                filterOneMonth={filterOneMonth}
                filterCustomDays={filterCustomDays}
                onOpen={showCalendar}
                mainIcon={'magnify'}
                mainIconColor={'#FFF'}
                icon1={'calendar-search'}
                label1={'Listar por data'}
                color1={'#fca311'}
                icon2={'numeric'}
                label2={'Listar por valor'}
                color2={'#0077b6'}
            />

        </Container>
    );
}

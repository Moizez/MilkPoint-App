import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import 'moment/locale/pt-br'
import api from '../../../services/api'

import CardHistorico from '../../../components/CardHistorico'
import Header from '../../../components/Header'
import DatePicker from '../../../components/DatePicker'
import FabSearch from '../../../components/FabSearch'
import Loader from '../../../components/Loader'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso, BoxIconUpdate, BoxIconDelete
} from './styles'

export default function TelaHistoricoProdutor() {

    const { user } = useContext(AuthContext)

    const [show, setShow] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [msg, setMsg] = useState('')
    const [color, setColor] = useState('#FFF')
    const [loading, setLoading] = useState(false)
    const [depositoResolvido, setDepositoResolvido] = useState([])
    const [mainData, setMainData] = useState([])

    let msgDefault = `Lista de transações do dia ${selectedDate && moment(selectedDate).format('L')}`
    let msgForValue = 'Lista de transações pelo valor do depósito'
    let msg15Days = 'Lista de transações dos últimos 15 dias'
    let msg30Days = 'Lista de transações dos últimos 30 dias'
    let msgCustomDays = 'Lista de DEPÓSITOS personalizada'
    let msgConfirmados = 'Lista de DEPÓSITOS confirmados'
    let msgCancelados = 'Lista de DEPÓSITOS cancelados'

    const onLoad = () => setLoading(true)

    //Filtrar por valor do pedido
    const getValor = (value) => {
        const filterByValue = depositoResolvido.filter(d => d.quantidade == value)
        setColor('#FFF')
        setMsg(msgForValue)
        setMainData(filterByValue)
        setLoading(false)
    }

    //Filtrar pelos últimos 15 dias
    const filterFifteenDays = () => {
        let fifteenDays = moment().locale('en').subtract(15, 'days').format('L')
        const fifteenDaysAgo = depositoResolvido.filter(function (d) {
            let dayDep = moment(d.dataNow).locale('en').format('L')
            return moment(dayDep).isSameOrAfter(fifteenDays, 'days')
        })
        setColor('#e9c46a')
        setMsg(msg15Days)
        setMainData(fifteenDaysAgo)
        setLoading(false)
    }

    //Filtrar pelos últimos 30 dias
    const filterOneMonth = () => {
        let oneMonth = moment().locale('en').subtract(1, 'month').format('L')
        const oneMonthAgo = depositoResolvido.filter(function (d) {
            let dayDep = moment(d.dataNow).locale('en').format('L')
            return moment(dayDep).isSameOrAfter(oneMonth, 'days')
        })
        setColor('#e76f51')
        setMsg(msg30Days)
        setMainData(oneMonthAgo)
        setLoading(false)
    }

    //Filtrar por data personalizada
    const filterCustomDays = (value) => {
        let customDay = moment(value).locale('en').format('L')
        const customDayAgo = depositoResolvido.filter(function (d) {
            let dayDep = moment(d.dataNow).locale('en').format('L')
            return moment(dayDep).isSameOrAfter(customDay, 'days')
        })
        setColor('#DDD')
        setMsg(msgCustomDays)
        setMainData(customDayAgo)
        setLoading(false)
    }

    const loadResolved = async (type) => {
        setLoading(true)
        const tipo = type ? 'confirmados' : 'cancelados'
        const response = await api.get(`deposito/${tipo}/${user.id}`)
        setMsg(type ? msgConfirmados : msgCancelados)
        setColor(type ? '#2a9d8f' : '#da1e37')
        setMainData(response.data)
        setLoading(false)
    }

    //Lista de todos os depósitos pela data selecionada
    const loadPage = async () => {
        setLoading(true)
        const produtor = d => d.produtor.id == user.id
        const response = await api.get('deposito/resolvidos')
        setDepositoResolvido(response.data)

        const filterData = response.data.filter(produtor)
        let day = moment(selectedDate).format('L')
        const data = filterData.filter(function (r) {
            let regDay = moment(r.dataNow).format('L')
            return regDay === day
        })
        setColor('#FFF')
        setMsg(msgDefault)
        setMainData(data)
        setLoading(false)
    }

    useEffect(() => {
        loadPage()
    }, [selectedDate])

    function onChange(value) {
        setShow(Platform.OS === 'ios')
        setColor('#FFF')
        setSelectedDate(value)
    }

    async function onRefreshList() {
        setColor('#FFF')
        setIsRefreshing(true)
        setSelectedDate(new Date())
        await loadPage()
        setIsRefreshing(false)
    }

    const showCalendar = () => setShow(true)

    return (
        <Container>
            <Header
                msg={msg}
                onOpen={showCalendar}
                calendar={<Icon name='calendar-month' color={color} size={22} />}
            />
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
                loadResolved={loadResolved}
                onLoad={onLoad}
                filterFifteenDays={filterFifteenDays}
                filterOneMonth={filterOneMonth}
                filterCustomDays={filterCustomDays}
                onOpen={showCalendar}
                mainIcon={'magnify'}
                mainIconColor={'#FFF'}
            />
            {loading && !isRefreshing && <Loader />}
        </Container>
    );
}
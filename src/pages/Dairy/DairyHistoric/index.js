import React, { useState, useEffect, useContext } from 'react';
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import 'moment/locale/pt-br'

import Api from '../../../services/dairy.api'
import { AuthContext } from '../../../contexts/auth'

import HistoricCard from '../../../components/HistoricCard'
import Header from '../../../components/Header'
import DatePicker from '../../../components/DatePicker'
import FabSearch from '../../../components/FabSearch'
import Loader from '../../../components/Loader'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso, BoxIconUpdate, BoxIconDelete
} from './styles'

const DairyHistoric = () => {

    const { user } = useContext(AuthContext)

    const [show, setShow] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [msg, setMsg] = useState('')
    const [color, setColor] = useState('#FFF')
    const [loading, setLoading] = useState(false)
    const [retiradaResolvida, setRetiradaResolvida] = useState([])
    const [mainData, setMainData] = useState([])

    let msgDefault = `Lista de transações do dia ${selectedDate && moment(selectedDate).format('L')}`
    let msgForValue = 'Lista de transações pelo valor da retirada'
    let msg15Days = 'Lista de transações dos últimos 15 dias'
    let msg30Days = 'Lista de transações dos últimos 30 dias'
    let msgCustomDays = 'Lista de RETIRADAS personalizada'
    let msgConfirmados = 'Lista de RETIRADAS confirmadas'
    let msgCancelados = 'Lista de RETIRADAS canceladas'

    //Filtrar por valor do pedido
    function getValor(value) {
        setLoading(true)
        const filterByValue = retiradaResolvida.filter(r => r.quantidade == value)
        setColor('#FFF')
        setMsg(msgForValue)
        setMainData(filterByValue)
        setLoading(false)
    }

    //Filtrar pelos últimos 15 dias
    const filterFifteenDays = () => {
        setLoading(true)
        let fifteenDays = moment().locale('en').subtract(15, 'days').format('L')
        const fifteenDaysAgo = retiradaResolvida.filter(function (d) {
            let dayRet = moment(d.dataNow).locale('en').format('L')
            return moment(dayRet).isSameOrAfter(fifteenDays, 'days')
        })
        setColor('#e9c46a')
        setMsg(msg15Days)
        setMainData(fifteenDaysAgo)
        setLoading(false)
    }

    //Filtrar pelos últimos 30 dias
    const filterOneMonth = () => {
        setLoading(true)
        let oneMonth = moment().locale('en').subtract(1, 'month').format('L')
        const oneMonthAgo = retiradaResolvida.filter(function (d) {
            let dayRet = moment(d.dataNow).locale('en').format('L')
            return moment(dayRet).isSameOrAfter(oneMonth, 'days')
        })
        setColor('#e76f51')
        setMsg(msg30Days)
        setMainData(oneMonthAgo)
        setLoading(false)
    }

    //Filtrar por data personalizada
    const filterCustomDays = (value) => {
        setLoading(true)
        let customDay = moment(value).locale('en').format('L')
        const customDayAgo = retiradaResolvida.filter(function (d) {
            let dayRet = moment(d.dataNow).locale('en').format('L')
            return moment(dayRet).isSameOrAfter(customDay, 'days')
        })
        setColor('#DDD')
        setMsg(msgCustomDays)
        setMainData(customDayAgo)
        setLoading(false)
    }

    const loadResolved = async (type) => {
        setLoading(true)
        const status = type ? 'confirmados' : 'cancelados'
        const response = await Api.getAllWithdrawalsConfirmedOrCanceledUser(status) 
        setMsg(type ? msgConfirmados : msgCancelados)
        setColor(type ? '#2a9d8f' : '#da1e37')
        setMainData(response)
        setLoading(false)
    }

    //Lista de todas as retiradas pela data
    const loadPage = async () => {
        setLoading(true)
        const laticinio = r => r.laticinio.id == user.id
        const response = await Api.getAllWithdrawalsResolved()
        setRetiradaResolvida(response)

        const filterData = response.filter(laticinio)
        let day = moment(selectedDate).format('L')
        const data = filterData.filter(function (r) {
            let regDay = moment(r.dataNow).format('L')
            return regDay === day
        })
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
                renderItem={({ item }) => <HistoricCard data={item} />}
                ListEmptyComponent={
                    <BoxNomeAviso>
                        <NomeAviso style={{ marginBottom: 70 }}>Não há registros!</NomeAviso>
                        <NomeAviso style={{ marginBottom: 15 }}>{<Icon name='lightbulb-on-outline' color='#adb5bd' size={25} />} Dicas</NomeAviso>
                        <BoxIconAviso>
                            <BoxIconUpdate>
                                <Icon name='gesture-swipe-down' color='#adb5bd' size={60} />
                                <NomeAviso>Clique e arraste para atualizar a lista</NomeAviso>
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
                loadResolved={loadResolved}
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
            {loading && !isRefreshing && <Loader />}
        </Container>
    );
}

export default DairyHistoric

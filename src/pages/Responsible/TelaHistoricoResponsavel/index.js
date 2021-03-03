import React, { useState, useEffect, useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../../../contexts/auth'
import { RefreshControl, StyleSheet } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import api from '../../../services/api'

import CardHistorico from '../../../components/CardHistorico'
import Header from '../../../components/Header'
import DatePicker from '../../../components/DatePicker'
import FabGroup from '../../../components/FabGroup'
import Loader from '../../../components/Loader'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

export default function TelaHistoricoResponsavel() {

    const { user } = useContext(AuthContext)

    const [show, setShow] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [msg, setMsg] = useState('')
    const [color, setColor] = useState('#FFF')
    const [loading, setLoading] = useState(false)
    const [mainData, setMainData] = useState([])
    const [secondaryData, setSecondaryData] = useState([])
    const [status, setStatus] = useState(true)

    const onLoad = (value) => setLoading(value)

    //Mensagens das ações de listagem
    let checkMsg = status ? 'DEPÓSITOS' : 'RETIRADAS'
    let msgDefault = `Lista de ${checkMsg} do dia ${selectedDate && moment(selectedDate).format('L')}`

    //Filtrar pelo nome da pessoa
    const findByName = async (value) => {
        setLoading(true)
        setMsg(status ? `Busca de depósitos pelo nome: ${value}` : `Busca de retiradas pelo nome: ${value}`)
        let tipo = status ? 'deposito' : 'retirada'
        const response = await api.get(`${tipo}/buscar/${value}`)
        setMainData(response.data)
        setLoading(false)
    }

    //Filtrar pelos últimos 15 dias
    const filterFifteenDays = () => {
        let fifteenDays = moment().locale('en').subtract(15, 'days').format('L')
        const fifteenDaysAgo = secondaryData.filter(function (d) {
            let regDay = moment(d.dataNow).locale('en').format('L')
            return moment(regDay).isSameOrAfter(fifteenDays, 'days')
        })
        setColor('#e9c46a')
        setMsg(`Lista de ${status ? 'DEPÓSITOS' : 'RETIRADAS'} dos últimos 15 dias`)
        setMainData(fifteenDaysAgo)
    }

    //Filtrar pelos últimos 30 dias
    const filterOneMonth = () => {
        let oneMonth = moment().locale('en').subtract(1, 'month').format('L')
        const oneMonthAgo = secondaryData.filter(function (d) {
            let regDay = moment(d.dataNow).locale('en').format('L')
            return moment(regDay).isSameOrAfter(oneMonth, 'days')
        })
        setColor('#e76f51')
        setMsg(`Lista de ${status ? 'DEPÓSITOS' : 'RETIRADAS'} dos últimos 30 dias`)
        setMainData(oneMonthAgo)
    }

    //Filtrar por data personalizada
    const filterCustomDays = (value) => {
        let customDay = moment(value).locale('en').format('L')
        const customDayAgo = secondaryData.filter(function (d) {
            let regDay = moment(d.dataNow).locale('en').format('L')
            return moment(regDay).isSameOrAfter(customDay, 'days')
        })
        setColor('#DDD')
        setMsg(`Lista de ${status ? 'DEPÓSITOS' : 'RETIRADAS'} personalizada`)
        setMainData(customDayAgo)
    }

    useEffect(() => {
        loadList()
    }, [selectedDate, status])

    const loadList = async () => {
        setLoading(true)
        const state = status ? 'deposito' : 'retirada'
        const response = await api.get(`${state}/resolvidos/responsavel/${user.id}`)
        setSecondaryData(response.data)

        let day = moment(selectedDate).format('L')
        const result = response.data.filter(function (r) {
            let regDay = moment(r.dataNow).format('L')
            return regDay === day
        })
        setMainData(result)
        setMsg(msgDefault)
        setColor('#DDD')
        setLoading(false)
    }

    function onChange(value) {
        setShow(Platform.OS === 'ios')
        setColor('#FFF')
        setSelectedDate(value)
    }

    const onRefreshList = async () => {
        setColor('#FFF')
        setIsRefreshing(true)
        setSelectedDate(new Date())
        await loadList()
        setIsRefreshing(false)
    }

    const showCalendar = () => setShow(true)
    const changeState = (value) => setStatus(value)

    return (
        <Container>
            <Header
                msg={msg}
                onOpen={showCalendar}
                calendar={<Icon name='calendar-search' color={color} size={22} />}
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
                                <NomeAviso>Clique e arraste para atualizar a lista</NomeAviso>
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

            <FabGroup
                styleFab={{ backgroundColor: '#292b2c', borderWidth: 2, borderColor: '#FFF' }}
                findByName={findByName}
                onLoad={onLoad}
                filterFifteenDays={filterFifteenDays}
                filterOneMonth={filterOneMonth}
                filterCustomDays={filterCustomDays}
                changeState={changeState}
                onOpen={showCalendar}
                mainIcon={'magnify'}
                mainIconColor={'#FFF'}
            />
            {loading && !isRefreshing && <Loader />}
        </Container>
    );
}

const styles = StyleSheet.create({
    containerModal: {
        width: '95%',
        margin: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 5
    },
    input: {
        backgroundColor: '#DDD',
        textAlign: 'center',
        fontSize: 18,
        width: '90%',
        color: '#000',
        marginTop: 15,
        marginBottom: 15,
        padding: 10,
        borderRadius: 8,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: '90%',
        marginTop: 8,
    },
    textInfo: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        marginRight: 25,
    },
    btnStyle: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
    },
    someDays: {
        backgroundColor: '#e9c46a',
        height: 35,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginVertical: 15,
        flexDirection: 'row',
    },
    dateSearch: {
        backgroundColor: '#adb5bd',
        height: 35,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginVertical: 15,
        flexDirection: 'row'
    },
    textDays: {
        fontSize: 16,
        marginRight: 5
    },
    fab: {
        backgroundColor: '#000'
    },
    fabActions: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fabStyles: {
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'white',
        shadowOpacity: 0
    }
})


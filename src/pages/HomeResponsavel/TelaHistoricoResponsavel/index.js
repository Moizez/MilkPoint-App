import React, { useState, useEffect, useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../../../contexts/auth'
import { RefreshControl, StyleSheet } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'

import CardHistorico from '../../../components/CardHistorico'
import Header from '../../../components/Header'
import DatePicker from '../../../components/DatePicker'
import FabGroup from '../../../components/FabGroup'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

export default function TelaHistoricoResponsavel() {

    const {
        user, loadListDepositos, loadListRetiradas, deposito, retirada
    } = useContext(AuthContext)

    const [show, setShow] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [check, setCheck] = useState(true)
    const [dataDeposito, setDataDeposito] = useState([])
    const [dataRetirada, setDataRetirada] = useState([])
    const [msg, setMsg] = useState('')
    //const [customDate, setCustomDate] = useState()

    //Mensagens das ações de listagens
    let checkMsg = check ? 'DEPÓSITOS' : 'RETIRADAS'
    let msgName = `Lista de ${check ? 'produtores' : 'laticínios'}`
    let msgDefault = `Lista de ${checkMsg} do dia ${selectedDate && moment(selectedDate).format('L')}`
    let msg15Days = `Lista de ${checkMsg} dos últimos 15 dias`
    let msg30Days = `Lista de ${checkMsg} dos últimos 30 dias`
    let msgCustomDays = `Lista de ${checkMsg} personalizada`
    //let msgCustomDays = `Lista de ${checkMsg} de ${moment(customDate).format('l')} até ${moment().format('l')}`

    //Lista dos depositos e retiradas por status e usuário logado
    const responsavelId = p => p.tanque.responsavel.id == user.id
    const status = s => s.confirmacao == true || s.excluido == true
    const depositos = deposito.filter(responsavelId).filter(status)
    const retiradas = retirada.filter(responsavelId).filter(status)
    const depositos_retiradas = depositos.concat(retiradas)

    //Filtrar pelo nome da pessoa
    async function findByName(value) {
        const filterByName = await depositos_retiradas.filter(function (n) {
            return n.produtor.nome || n.laticinio.nome == value
        })
        setMsg(msgName)
        setDataDeposito(filterByName)
        return dataDeposito
    }

    //Filtrar pelos últimos 15 dias
    const filterFifteenDaysDeposito = async () => {
        let fifteenDays = moment().locale('en').subtract(15, 'days').format('L')
        const fifteenDaysAgo = await depositos.filter(function (d) {
            let regDay = moment(d.dataNow).locale('en').format('L')
            return moment(regDay).isSameOrAfter(fifteenDays, 'days')
        })
        setMsg(msg15Days)
        setDataDeposito(fifteenDaysAgo)
        return dataDeposito
    }

    //Filtrar pelos últimos 30 dias
    const filterOneMonthDeposito = async () => {
        let oneMonth = moment().locale('en').subtract(1, 'month').format('L')
        const oneMonthAgo = await depositos.filter(function (d) {
            let regDay = moment(d.dataNow).locale('en').format('L')
            return moment(regDay).isSameOrAfter(oneMonth, 'days')
        })
        setMsg(msg30Days)
        setDataDeposito(oneMonthAgo)
        return dataDeposito
    }

    //Filtrar por data personalizada
    const filterCustomDaysDeposito = async (value) => {
        let customDay = moment(value).locale('en').format('L')
        const customDayAgo = await depositos.filter(function (d) {
            let regDay = moment(d.dataNow).locale('en').format('L')
            return moment(regDay).isSameOrAfter(customDay, 'days')
        })
        setMsg(msgCustomDays)
        setDataDeposito(customDayAgo)
        return dataDeposito
    }

    //Lista de todos os depositos pela data
    const checkDateDeposito = async () => {
        let day = moment(selectedDate).format('L')
        const dayDeposito = await depositos.filter(function (r) {
            let regDay = moment(r.dataNow).format('L')
            return regDay === day
        })
        setMsg(msgDefault)
        setDataDeposito(dayDeposito)
        return dataDeposito
    }

    //Filtrar retiradas pelos últimos 15 dias
    const filterFifteenDaysRetirada = async () => {
        let fifteenDays = moment().locale('en').subtract(15, 'days').format('L')
        const fifteenDaysAgo = await retiradas.filter(function (d) {
            let regDay = moment(d.dataNow).locale('en').format('L')
            return moment(regDay).isSameOrAfter(fifteenDays, 'days')
        })
        setMsg(msg15Days)
        setDataRetirada(fifteenDaysAgo)
        return dataRetirada
    }

    //Filtrar pelos últimos 30 dias
    const filterOneMonthRetirada = async () => {
        let oneMonth = moment().locale('en').subtract(1, 'month').format('L')
        const oneMonthAgo = await retiradas.filter(function (d) {
            let regDay = moment(d.dataNow).locale('en').format('L')
            return moment(regDay).isSameOrAfter(oneMonth, 'days')
        })
        setMsg(msg30Days)
        setDataRetirada(oneMonthAgo)
        return dataRetirada
    }

    //Filtrar por data personalizada
    const filterCustomDaysRetirada = async (value) => {
        let customDay = moment(value).locale('en').format('L')
        const customDayAgo = await retiradas.filter(function (d) {
            let regDay = moment(d.dataNow).locale('en').format('L')
            return moment(regDay).isSameOrAfter(customDay, 'days')
        })
        setMsg(msgCustomDays)
        setDataRetirada(customDayAgo)
        return dataRetirada
    }

    //Lista de todas as retiradas pela data
    const checkDateRetirada = async () => {
        let day = moment(selectedDate).format('L')
        const dayRetirada = await retiradas.filter(function (r) {
            let regDay = moment(r.dataNow).format('L')
            return regDay === day
        })
        setMsg(msgDefault)
        setDataRetirada(dayRetirada)
        return dataRetirada
    }

    useEffect(() => {
        if (check) {
            checkDateDeposito()
            loadListDepositos()
        } else {
            checkDateRetirada()
            loadListRetiradas()
        }
    }, [selectedDate, check])

    function onChange(value) {
        setShow(Platform.OS === 'ios')
        setSelectedDate(value)
    }

    async function onRefreshList() {
        setIsRefreshing(true)
        check ? await checkDateDeposito(selectedDate) : await checkDateRetirada(selectedDate)
        setIsRefreshing(false)
    }

    const showCalendar = () => setShow(true)
    const changeCheck = (value) => { setCheck(value) }

    return (
        <Container>
            <Header
                msg={msg}
                onOpen={showCalendar}
                calendar={<Icon name='calendar-month' color='#FFF' size={22} />}
            />

            <List
                showsVerticalScrollIndicator={false}
                data={check ? dataDeposito : dataRetirada}
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

            <FabGroup
                styleFab={{ backgroundColor: '#292b2c', borderWidth: 2, borderColor: '#FFF' }}
                findByName={findByName}
                filterFifteenDaysDeposito={filterFifteenDaysDeposito}
                filterOneMonthDeposito={filterOneMonthDeposito}
                filterFifteenDaysRetirada={filterFifteenDaysRetirada}
                filterOneMonthRetirada={filterOneMonthRetirada}
                filterCustomDays={check ? filterCustomDaysDeposito : filterCustomDaysRetirada}
                changeCheck={changeCheck}
                checkDateDeposito={checkDateDeposito}
                checkDateRetirada={checkDateRetirada}
                onOpen={showCalendar}
                mainIcon={'magnify'}
                mainIconColor={'#FFF'}
            />
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


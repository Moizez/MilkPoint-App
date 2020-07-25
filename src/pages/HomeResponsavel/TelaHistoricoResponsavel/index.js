import React, { useState, useEffect, useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../../../contexts/auth'
import { RefreshControl, StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper'
import moment from 'moment'

import CardHistorico from '../../../components/CardHistorico'
import Header from '../../../components/Header'
import DatePicker from '../../../components/DatePicker'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

export default function TelaHistoricoResponsavel() {

    const { user, loadListDepositos, loadListRetiradas, deposito, retirada } = useContext(AuthContext)

    const [show, setShow] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [check, setCheck] = useState(true)
    const [dateDeposito, setDateDeposito] = useState([])
    const [dateRetirada, setDateRetirada] = useState([])

    //Fab button
    const [state, setState] = useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;

    //Lista dos depositos e retiradas por status e usuário logado
    const responsavelId = p => p.tanque.responsavel.id == user.id
    const status = s => s.confirmacao == true || s.excluido == true
    const depositos = deposito.filter(responsavelId).filter(status)
    const retiradas = retirada.filter(responsavelId).filter(status)

    //Lista de todos os depositos pela data
    const checkDateDeposito = async () => {
        let day = moment(selectedDate).format('L')
        const dayDeposito = await depositos.filter(function (r) {
            let dayRet = moment(r.dataNow).format('L')
            return dayRet === day
        })
        setDateDeposito(dayDeposito)
        return dateDeposito
    }

    //Lista de todas as retiradas pela data
    const checkDateRetirada = async () => {
        let day = moment(selectedDate).format('L')
        const dayRetirada = await retiradas.filter(function (r) {
            let dayRet = moment(r.dataNow).format('L')
            return dayRet === day
        })
        setDateRetirada(dayRetirada)
        return dateRetirada
    }

    useEffect(() => {
        if (check == true) {
            checkDateDeposito()
            loadListDepositos()
        } else {
            checkDateRetirada()
            loadListRetiradas()
        }
    }, [selectedDate])

    function onChange(value) {
        setShow(Platform.OS === 'ios')
        setSelectedDate(value)
    }

    async function onRefreshList() {
        setIsRefreshing(true)
        check == false ? await checkDateRetirada(selectedDate) : await checkDateDeposito(selectedDate)
        setIsRefreshing(false)
    }

    const showCalendar = () => setShow(true)

    return (
        <Container>
            <Header
                nameList={`Lista de ${check == true ? 'DEPÓSITOS' : 'RETIRADAS'} do dia ${selectedDate && moment(selectedDate).format('L')}`}
                onOpen={showCalendar}
                calendar={<Icon name='calendar-month' color='#FFF' size={22} />}
            />


            <List
                showsVerticalScrollIndicator={false}
                data={check == false ? dateRetirada : dateDeposito}
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

            <FAB.Group
                fabStyle={{ backgroundColor: 'black', borderWidth: 1, borderColor: 'white', shadowOpacity: 0 }}
                color='#FFF'
                open={open}
                icon={open ? 'close' : 'magnify'}
                actions={[
                    {
                        icon: 'calendar-search',
                        label: 'Listar por data',
                        color: '#fca311',
                        onPress: () => {
                            setShow(true)
                        },
                    },
                    {
                        icon: 'basket-fill',
                        label: 'Listar por depósitos',
                        color: '#2a9d8f',
                        onPress: () => {
                            setCheck(true)
                            checkDateDeposito(selectedDate)
                        },
                    },
                    {
                        icon: 'basket-unfill',
                        label: 'Listar por retiradas',
                        color: '#da1e37',
                        onPress: () => {
                            setCheck(false)
                            checkDateRetirada(selectedDate)
                        },
                    },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                    if (open) {
                        // do something if the speed dial is open
                    }
                }}
            />

        </Container>
    );
}

const styles = StyleSheet.create({
    fab: {
        backgroundColor: '#000'
    }
})


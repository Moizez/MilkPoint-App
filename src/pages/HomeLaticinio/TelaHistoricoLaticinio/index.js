import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'

import CardHistorico from '../../../components/CardHistorico'
import Header from '../../../components/Header'
import DatePicker from '../../../components/DatePicker'

import {
    Container, Box, BoxNomeAviso, NomeAviso, Titulo, List, Calendar, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

export default function TelaHistoricoLaticinio() {

    const { user, loadListRetiradas, retirada } = useContext(AuthContext)
    const [dateRetirada, setDateRetirada] = useState([])

    const [show, setShow] = useState(false)
    const [newDate, setNewDate] = useState(new Date())
    const [isRefreshing, setIsRefreshing] = useState(false)

    const laticinio = r => r.laticinio.id == user.id
    const status = r => r.confirmacao != false || r.excluido != false
    const retiradas = retirada.filter(laticinio).filter(status)

    //Lista de todas as retiradas pela data
    const checkDate = async (value) => {
        let day = moment(value).format('L')
        const dayRetirada = await retiradas.filter(function (r) {
            let dayRet = moment(r.dataNow).format('L')
            return dayRet === day
        })
        return setDateRetirada(dayRetirada)
    }

    useEffect(() => {
        loadListRetiradas()
        checkDate(newDate)
    }, [])

    function onChange(value) {
        setShow(Platform.OS === 'ios')
        setNewDate(value)
        onRefreshList(value)
    }

    async function onRefreshList(value) {
        setIsRefreshing(true)
        await checkDate(value)
        setIsRefreshing(false)
    }

    return (
        <Container>
            <Header />

            <Box>
                <Titulo>Lista de transações do dia {newDate && moment(newDate).format('L')}</Titulo>
                <Calendar onPress={() => setShow(true)}>
                    <Icon
                        name='calendar-month'
                        color='#FFF'
                        size={25}>
                    </Icon>
                </Calendar>
            </Box>

            <List
                showsVerticalScrollIndicator={false}
                data={dateRetirada}
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
                        date={newDate}
                        onChange={onChange}
                    />)
            }

        </Container>
    );
}

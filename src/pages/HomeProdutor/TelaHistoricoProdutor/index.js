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

export default function TelaHistoricoProdutor() {

    const { user, loadListDepositos, deposito } = useContext(AuthContext)
    const [dateDeposito, setDateDeposito] = useState([])

    const [show, setShow] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [isRefreshing, setIsRefreshing] = useState(false)

    const produtor = d => d.produtor.id == user.id
    const status = d => d.confirmacao != false || d.excluido != false
    const depositos = deposito.filter(produtor).filter(status)

    //Lista de todos os depósitos pela data
    const checkDate = async () => {
        let day = moment(selectedDate).format('L')
        const dayDeposito = await depositos.filter(function (d) {
            let dayDep = moment(d.dataNow).format('L')
            return dayDep === day
        })
        setDateDeposito(dayDeposito)
        return dateDeposito
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

    return (
        <Container>
            <Header />

            <Box>
                <Titulo>Lista de transações do dia {selectedDate && moment(selectedDate).format('L')}</Titulo>
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
                data={dateDeposito}
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

        </Container>
    );
}

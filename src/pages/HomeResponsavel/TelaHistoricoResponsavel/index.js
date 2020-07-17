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
    Container, BoxNomeAviso, NomeAviso, Box, Calendar, Titulo, List, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

export default function TelaHistoricoResponsavel() {

    const { loadListDepositos, loadListRetiradas, deposito, retirada } = useContext(AuthContext)

    const [show, setShow] = useState(false)
    const [newDate, setNewDate] = useState(new Date())
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [value, setValue] = useState(false)
    const [dateDeposito, setDateDeposito] = useState([])
    const [dateRetirada, setDateRetirada] = useState([])

    //Fab button
    const [state, setState] = useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;

    //Lista dos depositos por status
    const depositos = deposito.filter(function (status) {
        return status.confirmacao === true || status.excluido === true
    })

    //Lista das retiradas por status
    const retiradas = retirada.filter(function (status) {
        return status.confirmacao === true || status.excluido === true
    })

    //Lista de todas os depositos pela data
    const checkDateDeposito = async (value) => {
        let day = moment(value).format('L')
        const dayDeposito = await depositos.filter(function (r) {
            let dayRet = moment(r.dataNow).format('L')
            return dayRet === day
        })
        return setDateDeposito(dayDeposito)
    }

    //Lista de todas as retiradas pela data
    const checkDateRetirada = async (dado) => {
        let day = moment(dado).format('L')
        const dayRetirada = await retiradas.filter(function (r) {
            let dayRet = moment(r.dataNow).format('L')
            return dayRet === day
        })
        return setDateRetirada(dayRetirada)
    }

    useEffect(() => {
        if (value == true) {
            loadListDepositos()
            checkDateDeposito(newDate)
        } else {
            loadListRetiradas()
            checkDateRetirada(newDate)
        }
    }, [])

    function onChange(dado) {
        setShow(Platform.OS === 'ios')
        setNewDate(dado)
        onRefreshList(dado)
    }

    async function onRefreshList(dado) {
        setIsRefreshing(true)
        value === false ? await checkDateRetirada(dado) : await checkDateDeposito(dado)
        setIsRefreshing(false)
    }

    return (
        <Container>
            <Header />

            <Box>
                <Titulo>Lista de {value == true ? 'DEPÓSITOS' : 'RETIRADAS'} do dia {newDate && moment(newDate).format('L')}</Titulo>
                <Calendar onPress={() => setShow(true)}>
                    <Icon name='calendar-month' color='#FFF' size={25} />
                </Calendar>
            </Box>

            <List
                showsVerticalScrollIndicator={false}
                data={value == false ? dateRetirada : dateDeposito}
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

            <FAB.Group
                fabStyle={{ backgroundColor: 'black', borderWidth: 1, borderColor: 'white', shadowOpacity: 0 }}
                color='#FFF'
                open={open}
                icon={open ? 'close' : 'plus'}
                actions={[
                    {
                        icon: 'basket-fill',
                        label: 'Depósito',
                        color: '#2a9d8f',
                        onPress: () => setValue(true),
                    },
                    {
                        icon: 'basket-unfill',
                        label: 'Retirada',
                        color: '#da1e37',
                        onPress: () => setValue(false),
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


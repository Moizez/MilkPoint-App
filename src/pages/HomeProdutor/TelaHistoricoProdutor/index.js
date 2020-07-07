import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import MenuButton from '../../../components/MenuButton'
import ListaDepositos from '../../../components/ListaDepositos'
import Header from '../../../components/Header'
import DatePicker from '../../../components/DatePicker'

import { Container, Box, BoxNomeAviso, NomeAviso, Titulo, List, Calendar } from './styles'

let baseUrl = 'https://milkpointapi.cfapps.io/api/'

export default function TelaHistoricoProdutor() {

    const { user } = useContext(AuthContext)
    const [deposito, setDeposito] = useState([])
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    //Lista de todos os depositos
    const loadListDepositos = async () => {
        const response = await fetch(`${baseUrl}deposito/listatodos`)
        const data = await response.json()

        const produtor = d => d.produtor.id == user.id
        const status = d => d.confirmacao != false || d.excluido != false
        setDeposito(data.filter(produtor).filter(status))

        return deposito
    }

    useEffect(() => {
        loadListDepositos()
    }, [])

    function handleShowPicker() {
        setShow(true)
    }

    function onChange(date) {
        setDate(date)
    }

    async function onRefreshList() {
        setIsRefreshing(true)
        await loadListDepositos()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <MenuButton />

            <Header />

            <Box>
                <Titulo>Lista de transações</Titulo>
                <Calendar onPress={handleShowPicker}>
                    <Icon
                        name='calendar-month'
                        color='#FFF'
                        size={30}>
                    </Icon>
                </Calendar>
            </Box>

            <List
                showsVerticalScrollIndicator={false}
                data={deposito}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <ListaDepositos data={item} />}
                ListEmptyComponent={<BoxNomeAviso><NomeAviso>Não há registro de transações!</NomeAviso></BoxNomeAviso>}
            />

            {show && (
                <DatePicker
                    date={date}
                    onChange={onChange}
                />)}

        </Container>
    );
}
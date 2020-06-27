import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import MenuButton from '../../../components/MenuButton'
import ListaRetiradas from '../../../components/ListaRetiradas'
import Header from '../../../components/Header'
import DatePicker from '../../../components/DatePicker'

import { Container, Box, BoxNomeAviso, NomeAviso, Titulo, List, Calendar } from './styles'

export default function TelaHistoricoLaticinio() {

    const { user } = useContext(AuthContext)
    const [retirada, setRetirada] = useState([])
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false);

    //Lista de todos os retiradas
    useEffect(() => {
        const loadListRetiradas = async () => {
            const response = await fetch('https://milkpoint.herokuapp.com/api/retirada/listatodos')
            const retirada = await response.json()

            const laticinio = r => r.laticinio.id == user.id
            const status = r => r.confirmacao != false || r.excluido != false
            setRetirada(retirada.filter(laticinio).filter(status))
        }

        loadListRetiradas()

    }, [])


    function handleShowPicker() {
        setShow(true)
    }

    function onChange(date) {
        setDate(date)
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
                data={retirada}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<ListaRetiradas data={item} />)}
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
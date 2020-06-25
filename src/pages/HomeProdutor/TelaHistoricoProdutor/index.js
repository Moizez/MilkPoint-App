import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import MenuButton from '../../../components/MenuButton'
import ListaDepositos from '../../../components/ListaDepositos'
import Header from '../../../components/Header'

import {
    Container, Box, BoxNomeAviso, NomeAviso, Titulo, List, Calendar,
} from './styles'

export default function TelaHistoricoProdutor() {

    const { user } = useContext(AuthContext)
    const [deposito, setDeposito] = useState([])
    const [showCalendar, setShowCalendar] = useState(false)

    //Lista de todos os depositos
    useEffect(() => {
        const loadListDepositos = async () => {
            const response = await fetch('https://milkpoint.herokuapp.com/api/deposito/listatodos')
            const data = await response.json()

            const produtor = d => d.produtor.id == user.id
            const status = d => d.confirmacao != false || d.excluido != false
            setDeposito(data.filter(produtor).filter(status))
        }

        loadListDepositos()

    }, [])

    function handleShowPicker() {
        setShowCalendar(true)
    }

    return (
        <Container>
            <MenuButton />

            <Header />

            <Box>
                <Titulo>Lista de transações</Titulo>
                <Calendar onPress={() => handleShowPicker()}>
                    <Icon
                        name='calendar-month'
                        color='#FFF'
                        size={30}>
                    </Icon>
                </Calendar>
            </Box>

            <List
                showsVerticalScrollIndicator={false}
                extraData={deposito}
                data={deposito}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<ListaDepositos data={item} onShowCalendar={handleShowPicker} />)}
                ListEmptyComponent={<BoxNomeAviso><NomeAviso>Não há registro de transações!</NomeAviso></BoxNomeAviso>}
            />

        </Container>
    );
}
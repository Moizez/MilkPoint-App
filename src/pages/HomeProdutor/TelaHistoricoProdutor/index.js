import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth'

import MenuButton from '../../../components/MenuButton'
import ListaDepositos from '../../../components/ListaDepositos'
import Header from '../../../components/Header'

import { Container, Box, BoxNomeAviso, NomeAviso, Titulo, List } from '../styles'

export default function TelaHistoricoProdutor() {

    const { user } = useContext(AuthContext)
    const [deposito, setDeposito] = useState([])

    //Lista de todos os depositos
    useEffect(() => {
        const loadListDepositos = async () => {
            const response = await fetch('https://milkpoint.herokuapp.com/api/deposito/listatodos')
            const deposito = await response.json()

            const produtor = d => d.produtor.id == user.id
            const status = d => d.confirmacao != false || d.excluido != false
            setDeposito(deposito.filter(produtor).filter(status))
        }

        loadListDepositos()

    }, [])

    return (
        <Container>
            <MenuButton />

            <Header />

            <Box>
                <Titulo>Lista de transações</Titulo>
            </Box>

            <List
                showsVerticalScrollIndicator={false}
                data={deposito}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<ListaDepositos data={item} />)}
                ListEmptyComponent={<BoxNomeAviso><NomeAviso>Não há registro de transações!</NomeAviso></BoxNomeAviso>}
            />

        </Container>
    );
}
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth'

import MenuButton from '../../../components/MenuButton'
import ListaRetiradas from '../../../components/ListaRetiradas'
import Header from '../../../components/Header'

import { Container, Box, BoxNomeAviso, NomeAviso, Titulo, List } from '../styles'

export default function TelaHistoricoLaticinio() {

    const { user } = useContext(AuthContext)
    const [retirada, setRetirada] = useState([])

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

    return (
        <Container>
            <MenuButton />

            <Header />

            <Box>
                <Titulo>Lista de transações</Titulo>
            </Box>

            <List
                showsVerticalScrollIndicator={false}
                data={retirada}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<ListaRetiradas data={item} />)}
                ListEmptyComponent={<BoxNomeAviso><NomeAviso>Não há registro de transações!</NomeAviso></BoxNomeAviso>}
            />

        </Container>
    );
}
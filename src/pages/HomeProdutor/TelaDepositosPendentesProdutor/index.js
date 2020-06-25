import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth'

import MenuButton from '../../../components/MenuButton'
import ListaDepositosPendentes from '../ListaDepositosPendentes'
import Header from '../../../components/Header'

import { Container, BoxNomeAviso, NomeAviso, Box, Titulo, List } from '../styles'

export default function TelaDepositosPendentesProdutor() {

    const { user } = useContext(AuthContext)
    const [depositoPendente, setDepositoPendente] = useState([])

    const loadListDepositosPendentes = async () => {
        const response = await fetch('https://milkpoint.herokuapp.com/api/deposito/listapendentes')
        const depositoPendente = await response.json()
        setDepositoPendente(depositoPendente.filter(function (deposito) {
            return deposito.produtor.id == user.id
        }))
    }

    //Lista de Depositos Pendentes
    useEffect(() => {
        loadListDepositosPendentes()
    }, [])

    return (
        <Container>
            <MenuButton />
            <Header />

            <Box>
                <Titulo>Lista de depósitos pendentes</Titulo>
            </Box>

            <List
                showsVerticalScrollIndicator={false}
                data={depositoPendente}
                extraData={depositoPendente}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<ListaDepositosPendentes data={item} />)}
                ListEmptyComponent={<BoxNomeAviso><NomeAviso>Não há depósitos pendentes!</NomeAviso></BoxNomeAviso>}
            />
        </Container>
    );
}
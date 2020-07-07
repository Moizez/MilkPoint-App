import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native'

import MenuButton from '../../../components/MenuButton'
import Header from '../../../components/Header'
import ListaDepositosPendentes from '../ListaDepositosPendentes'

import { Container, BoxNomeAviso, NomeAviso, Box, Titulo, List } from './styles'

let baseUrl = 'https://milkpointapi.cfapps.io/api/'

export default function TelaDepositosPendentesResponsavel() {

    const [depositoPendente, setDepositoPendente] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)

    //Lista de Depositos Pendentes
    const loadListDepositosPendentes = async () => {
        const response = await fetch(`${baseUrl}deposito/listapendentes`)
        setDepositoPendente(await response.json())
        return depositoPendente
    }

    useEffect(() => {
        loadListDepositosPendentes()
    }, [])

    async function onRefreshList() {
        setIsRefreshing(true)
        await loadListDepositosPendentes()
        setIsRefreshing(false)
    }

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
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <ListaDepositosPendentes data={item} onRefresh={onRefreshList} />}
                ListEmptyComponent={<BoxNomeAviso><NomeAviso>Não há depósitos pendentes!</NomeAviso></BoxNomeAviso>}
            />
        </Container>
    );
}
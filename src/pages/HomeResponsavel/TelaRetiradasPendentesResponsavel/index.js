import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native'

import MenuButton from '../../../components/MenuButton'
import Header from '../../../components/Header'
import ListaRetiradasPendentes from '../ListaRetiradasPendentes'

import { Container, BoxNomeAviso, NomeAviso, Box, Titulo, List } from './styles'

let baseUrl = 'https://milkpointapi.cfapps.io/api/'

export default function TelaRetiradasPendentesResponsavel() {

    const [retiradaPendente, setRetiradaPendente] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)

    //Lista de Retiradas Pendentes
    const loadListRetiradasPendentes = async () => {
        const response = await fetch(`${baseUrl}retirada/listapendentes`)
        setRetiradaPendente(await response.json())
        return retiradaPendente
    }

    useEffect(() => {
        loadListRetiradasPendentes()
    }, [])

    async function onRefreshList() {
        setIsRefreshing(true)
        await loadListRetiradasPendentes()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <MenuButton />

            <Header />

            <Box>
                <Titulo>Lista de retiradas pendentes</Titulo>
            </Box>

            <List
                showsVerticalScrollIndicator={false}
                data={retiradaPendente}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <ListaRetiradasPendentes data={item} onRefresh={onRefreshList} />}
                ListEmptyComponent={<BoxNomeAviso><NomeAviso>Não há retiradas pendentes!</NomeAviso></BoxNomeAviso>}
            />
        </Container>
    );
}
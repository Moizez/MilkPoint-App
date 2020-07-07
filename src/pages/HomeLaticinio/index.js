import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native'

import MenuButton from '../../components/MenuButton'
import ListaTanques from '../HomeLaticinio/ListaTanques'
import Header from '../../components/Header'

import { Container, BoxNomeAviso, NomeAviso, Box, Titulo, List } from './styles'

let baseUrl = 'https://milkpointapi.cfapps.io/api/'

export default function HomeLaticinio() {

    const [tanque, setTanque] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)

    //Carregar lista de tanques 
    const loadListTanques = async () => {
        const response = await fetch(`${baseUrl}tanque`)
        const data = await response.json()
        setTanque(data)
    }

    useEffect(() => {
        loadListTanques()
    }, [])

    async function onRefreshList() {
        setIsRefreshing(true)
        await loadListTanques()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <MenuButton />

            <Header />

            <Box>
                <Titulo>Lista de tanques</Titulo>
            </Box>

            <List
                showsVerticalScrollIndicator={false}
                data={tanque}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <ListaTanques data={item} />}
                ListEmptyComponent={<BoxNomeAviso><NomeAviso>Nenhum tanque disponível!</NomeAviso></BoxNomeAviso>}
            />
        </Container>
    );
}
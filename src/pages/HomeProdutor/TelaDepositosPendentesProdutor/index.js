import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth'
import { RefreshControl } from 'react-native'

import MenuButton from '../../../components/MenuButton'
import ListaDepositosPendentes from '../ListaDepositosPendentes'
import Header from '../../../components/Header'

import { Container, BoxNomeAviso, NomeAviso, Box, Titulo, List } from './styles'

let baseUrl = 'https://milkpointapi.cfapps.io/api/'

export default function TelaDepositosPendentesProdutor() {

    const { user } = useContext(AuthContext)
    const [depositoPendente, setDepositoPendente] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)

    //Lista de depositos pendentes
    const loadListDepositosPendentes = async () => {
        const response = await fetch(`${baseUrl}deposito/listapendentes`)
        const depositoPendente = await response.json()
        setDepositoPendente(depositoPendente.filter(function (deposito) {
            return deposito.produtor.id == user.id
        }))
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
                renderItem={({ item }) => (<ListaDepositosPendentes data={item} onRefresh={onRefreshList} />)}
                ListEmptyComponent={<BoxNomeAviso><NomeAviso>Não há depósitos pendentes!</NomeAviso></BoxNomeAviso>}
            />
        </Container>
    );
}
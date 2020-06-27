import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth'
import { RefreshControl } from 'react-native'

import MenuButton from '../../../components/MenuButton'
import ListaRetiradasPendentes from '../ListaRetiradasPendentes'
import Header from '../../../components/Header'

import { Container, BoxNomeAviso, NomeAviso, Box, Titulo, List } from '../styles'


export default function TelaRetiradasPendentesLaticinio() {
    const { user } = useContext(AuthContext)
    const [retiradaPendente, setRetiradaPendente] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)

    //Lista de retiradas pendentes
    const loadListRetiradasPendentes = async () => {
        const response = await fetch('https://milkpoint.herokuapp.com/api/retirada/listapendentes')
        const data = await response.json()
        setRetiradaPendente(data.filter(function (retirada) {
            return retirada.laticinio.id == user.id
        }))

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
                <Titulo>Lista de depósitos pendentes</Titulo>
            </Box>

            <List
                showsVerticalScrollIndicator={false}
                data={retiradaPendente}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => (<ListaRetiradasPendentes data={item} refreshList={loadListRetiradasPendentes} />)}
                ListEmptyComponent={<BoxNomeAviso><NomeAviso>Não há retiradas pendentes!</NomeAviso></BoxNomeAviso>}
            />
        </Container>
    );
}
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth'
import { RefreshControl } from 'react-native'

import MenuButton from '../../../components/MenuButton'
import ListaRetiradasPendentes from '../ListaRetiradasPendentes'
import Header from '../../../components/Header'

import { Container, BoxNomeAviso, NomeAviso, Box, Titulo, List } from './styles'

let baseURL = 'https://milkpoint.herokuapp.com/api/'

export default function TelaRetiradasPendentesLaticinio() {
    const { user } = useContext(AuthContext)
    const [retiradaPendente, setRetiradaPendente] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [newArray, setNewArray] = useState([])

    //Lista de retiradas pendentes
    const loadListRetiradasPendentes = async () => {
        const response = await fetch(baseURL + 'retirada/listapendentes')
        const data = await response.json()

        setRetiradaPendente(data.filter(function (retirada) {
            return retirada.laticinio.id == user.id
        }))

        return retiradaPendente
    }

    const dataId = retiradaPendente.map(i => i.id)
    console.log('Logado: ' + dataId)

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
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (<ListaRetiradasPendentes data={item} index={index} />)}
                ListEmptyComponent={<BoxNomeAviso><NomeAviso>Não há retiradas pendentes!</NomeAviso></BoxNomeAviso>}
            />
        </Container>
    );
}
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../contexts/auth'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Header from '../../../components/Header'
import ListaDepositosPendentes from '../ListaDepositosPendentes'

import {
    Container, BoxNomeAviso, NomeAviso, Box, Titulo, List, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

export default function TelaDepositosPendentesResponsavel() {

    const { loadListDepositosPendentes, depositoPendente } = useContext(AuthContext)
    const [isRefreshing, setIsRefreshing] = useState(false)

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
                ListEmptyComponent={
                    <BoxNomeAviso>
                        <NomeAviso style={{ marginBottom: 70 }}>Não há depósitos pendentes!</NomeAviso>
                        <NomeAviso style={{ marginBottom: 15 }}>{<Icon name='lightbulb-on-outline' color='#adb5bd' size={25} />} Dicas</NomeAviso>
                        <BoxIconAviso>
                            <BoxIconUpdate>
                                <Icon name='gesture-swipe-down' color='#adb5bd' size={60} />
                                <NomeAviso>Clique e arraste para atualizar a lista</NomeAviso>
                            </BoxIconUpdate>
                            <BoxIconDelete>
                                <Icon name='gesture-tap' color='#adb5bd' size={60} />
                                <NomeAviso>Clique no depósito para confirmar ou cancelar</NomeAviso>
                            </BoxIconDelete>
                        </BoxIconAviso>
                    </BoxNomeAviso>}
            />
        </Container>
    );
}
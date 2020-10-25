import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../contexts/auth'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../../../services/api'

import Header from '../../../components/Header'
import ListaDepositosPendentes from '../ListaDepositosPendentes'
import Loader from '../../../components/Loader'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

export default function TelaDepositosPendentesResponsavel() {

    const { user } = useContext(AuthContext)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [depositoPendente, setDepositoPendente] = useState([])
    const [loading, setLoading] = useState(false)

    const loadDepositosPendentes = async () => {
        setLoading(true)
        const response = await api.get('deposito/listapendentes')
        const result = response.data.filter(d => d.tanque.responsavel.id === user.id)
        setDepositoPendente(result)
        setLoading(false)
    }

    useEffect(() => {
        loadDepositosPendentes()
    }, [])

    async function onRefreshList() {
        setIsRefreshing(true)
        await loadDepositosPendentes()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <Header msg={'Lista de depósitos pendentes'} />
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
                                <NomeAviso>Clique no depósito para aceitar ou recusar</NomeAviso>
                            </BoxIconDelete>
                        </BoxIconAviso>
                    </BoxNomeAviso>}
            />
            {loading && !isRefreshing && <Loader />}
        </Container>
    );
}
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../contexts/auth'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../../../services/api'

import Header from '../../../components/Header'
import ListaRetiradasPendentes from '../ListaRetiradasPendentes'
import Loader from '../../../components/Loader'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

export default function TelaRetiradasPendentesResponsavel() {

    const { user } = useContext(AuthContext)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [retiradaPendente, setRetiradaPendente] = useState([])
    const [loading, setLoading] = useState(false)

    const loadRetiradasPendentes = async () => {
        setLoading(true)
        const response = await api.get('retirada/listapendentes')
        const result = response.data.filter(r => r.tanque.responsavel.id === user.id)
        setRetiradaPendente(result)
        setLoading(false)
    }

    useEffect(() => {
        loadRetiradasPendentes()
    }, [])

    async function onRefreshList() {
        setIsRefreshing(true)
        await loadRetiradasPendentes()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <Header msg={'Lista de retiradas pendentes'} />
            <List
                showsVerticalScrollIndicator={false}
                data={retiradaPendente}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <ListaRetiradasPendentes data={item} onRefresh={onRefreshList} />}
                ListEmptyComponent={
                    <BoxNomeAviso>
                        <NomeAviso style={{ marginBottom: 70 }}>Não há retiradas pendentes!</NomeAviso>
                        <NomeAviso style={{ marginBottom: 15 }}>{<Icon name='lightbulb-on-outline' color='#adb5bd' size={25} />} Dicas</NomeAviso>
                        <BoxIconAviso>
                            <BoxIconUpdate>
                                <Icon name='gesture-swipe-down' color='#adb5bd' size={60} />
                                <NomeAviso>Clique e arraste para atualizar a lista</NomeAviso>
                            </BoxIconUpdate>
                            <BoxIconDelete>
                                <Icon name='gesture-tap' color='#adb5bd' size={60} />
                                <NomeAviso>Clique na retirada para aceitar ou recusar</NomeAviso>
                            </BoxIconDelete>
                        </BoxIconAviso>
                    </BoxNomeAviso>}
            />
            {loading && !isRefreshing && <Loader />}
        </Container>
    );
}
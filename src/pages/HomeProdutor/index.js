import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../../services/api'

import ListaTanques from '../HomeProdutor/ListaTanques'
import Header from '../../components/Header'
import Loader from '../../components/Loader'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso, BoxIconUpdate, BoxIconDelete
} from './styles'

export default function HomeProdutor() {

    const [tanque, setTanque] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)

    const loadTanques = async () => {
        setLoading(true)
        const response = await api.get(`tanque/ativos`)
        setTanque(response.data)
        setLoading(false)
    }

    useEffect(() => {
        loadTanques()
    }, [])

    async function onRefreshList() {
        setIsRefreshing(true)
        await loadTanques()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <Header msg={'Lista de tanques'} />
            <List
                showsVerticalScrollIndicator={false}
                data={tanque}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <ListaTanques data={item} loadTanques={loadTanques} />}
                ListEmptyComponent={
                    <BoxNomeAviso>
                        <NomeAviso style={{ marginBottom: 70 }}>Nenhum tanques disponíveis!</NomeAviso>
                        <NomeAviso style={{ marginBottom: 15 }}>{<Icon name='lightbulb-on-outline' color='#adb5bd' size={25} />} Dicas</NomeAviso>
                        <BoxIconAviso>
                            <BoxIconUpdate>
                                <Icon name='gesture-swipe-down' color='#adb5bd' size={60} />
                                <NomeAviso>Clique e arraste para atualizar os tanques</NomeAviso>
                            </BoxIconUpdate>
                            <BoxIconDelete>
                                <Icon name='gesture-tap-hold' color='#adb5bd' size={60} />
                                <NomeAviso>Clique e segure no tanque para mais detalhes</NomeAviso>
                            </BoxIconDelete>
                        </BoxIconAviso>
                    </BoxNomeAviso>}
            />
            {loading && !isRefreshing && <Loader />}
        </Container >
    );
}
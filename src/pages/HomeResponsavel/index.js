import React, { useContext, useState, useEffect } from 'react';
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../../services/api'

import Header from '../../components/Header'
import ListaTanques from '../HomeResponsavel/ListaTanques'
import { AuthContext } from '../../contexts/auth'
import Loader from '../../components/Loader'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

export default function HomeResponsavel() {

    const { tanqueResponsavel, loadListTanquesResponsavel, loadingPages } = useContext(AuthContext)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)

    const onLoader = (value) => {
        setLoading(value)
    }

    useEffect(() => {
        loadListTanquesResponsavel()
    }, [])

    const onRefreshList = async () => {
        setIsRefreshing(true)
        await loadListTanquesResponsavel()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <Header msg={'Lista de tanques'} />
            <List
                showsVerticalScrollIndicator={false}
                data={tanqueResponsavel}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <ListaTanques data={item} onLoader={onLoader} />}
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
            {loading && <Loader />}
            {loadingPages && !isRefreshing && <Loader />}
        </Container>
    );
}
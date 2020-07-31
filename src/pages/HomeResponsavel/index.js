import React, { useContext, useState, useEffect } from 'react';
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Header from '../../components/Header'
import ListaTanques from '../HomeResponsavel/ListaTanques'
import { AuthContext } from '../../contexts/auth'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

export default function HomeResponsavel() {

    const { tanqueResponsavel, loadListTanquesResponsavel } = useContext(AuthContext)
    const [isRefreshing, setIsRefreshing] = useState(false)

    useEffect(() => {
        loadListTanquesResponsavel()
    }, [])

    async function onRefreshList() {
        setIsRefreshing(true)
        await loadListTanquesResponsavel()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <Header nameList={'Lista de tanques'} />
            <List
                showsVerticalScrollIndicator={false}
                data={tanqueResponsavel}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => (<ListaTanques data={item} />)}
                ListEmptyComponent={
                    <BoxNomeAviso>
                        <NomeAviso style={{ marginBottom: 70 }}>Nenhum tanque disponível!</NomeAviso>
                        <NomeAviso style={{ marginBottom: 15 }}>{<Icon name='lightbulb-on-outline' color='#adb5bd' size={25} />} Dicas</NomeAviso>
                        <BoxIconAviso>
                            <BoxIconUpdate>
                                <Icon name='gesture-swipe-down' color='#adb5bd' size={60} />
                                <NomeAviso>Clique e arraste para atualizar os tanques</NomeAviso>
                            </BoxIconUpdate>
                            <BoxIconDelete>
                                <Icon name='gesture-tap' color='#adb5bd' size={60} />
                                <NomeAviso>Clique no tanque para mais detalhes</NomeAviso>
                            </BoxIconDelete>
                        </BoxIconAviso>
                    </BoxNomeAviso>}
            />
        </Container>
    );
}
import React, { useState, useEffect } from 'react'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Api from '../../../services/responsable.api'

import Header from '../../../components/Header'
import PendingWithdrawalsList from '../PendingWithdrawalsList'
import Loader from '../../../components/Loader'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

const ResponsibleWithdrawal = () => {

    const [isRefreshing, setIsRefreshing] = useState(false)
    const [pendingWithdrawals, setPendingWithdrawals] = useState([])
    const [loading, setLoading] = useState(false)

    const loadPendingWithdrawals = async () => {
        setLoading(true)
        const response = await Api.getResponsiblePendingWithdrawals()
        setPendingWithdrawals(response)
        setLoading(false)
    }

    useEffect(() => {
        loadPendingWithdrawals()
    }, [])

    const onRefreshList = () => {
        setIsRefreshing(true)
        loadPendingWithdrawals()
        setIsRefreshing(false)
    }
    return (
        <Container>
            <Header msg={'Lista de retiradas pendentes'} />
            <List
                showsVerticalScrollIndicator={false}
                data={pendingWithdrawals}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <PendingWithdrawalsList data={item} loadPage={onRefreshList} />}
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

export default ResponsibleWithdrawal
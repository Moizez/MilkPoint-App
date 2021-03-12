import React, { useState, useEffect } from 'react'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Api from '../../../services/responsable.api'

import Header from '../../../components/Header'
import PendingDepositsList from '../PendingDepositsList'
import Loader from '../../../components/Loader'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

const ResponsibleDeposit = () => {

    const [isRefreshing, setIsRefreshing] = useState(false)
    const [pendingDeposits, setPendingDeposits] = useState([])
    const [loading, setLoading] = useState(false)

    const loadPendingDeposits = async () => {
        setLoading(true)
        const response = await Api.getResponsiblePendingDeposits()
        setPendingDeposits(response)
        setLoading(false)
    }

    useEffect(() => {
        loadPendingDeposits()
    }, [])

    const onRefreshList = () => {
        setIsRefreshing(true)
        loadPendingDeposits()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <Header msg={'Lista de depósitos pendentes'} />
            <List
                showsVerticalScrollIndicator={false}
                data={pendingDeposits}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <PendingDepositsList data={item} loadPage={loadPendingDeposits} />}
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

export default ResponsibleDeposit
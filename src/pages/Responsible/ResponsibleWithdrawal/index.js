import React, { useState, useEffect } from 'react'
import { RefreshControl } from 'react-native'
import styled from 'styled-components/native'

import Api from '../../../services/responsable.api'
import Header from '../../../components/Header'
import PendingWithdrawalsList from '../PendingWithdrawalsList'
import Loader from '../../../components/Loader'
import EmptyListCard from '../../../components/Cards/EmptyListCard'

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
            <FlatList
                showsVerticalScrollIndicator={false}
                data={pendingWithdrawals}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <PendingWithdrawalsList data={item} loadPage={onRefreshList} />}
                ListEmptyComponent={
                    <EmptyListCard
                        iconLeft={'gesture-swipe-down'}
                        iconRight={'gesture-tap'}
                        infoLeft={'Clique e arraste para atualizar a lista.'}
                        infoRight={'Clique na solicitação para aceitar ou recusar.'}
                    />
                }
            />
            {loading && !isRefreshing && <Loader />}
        </Container>
    );
}

export default ResponsibleWithdrawal

const Container = styled.View`
    flex: 1;
    background-color: #292b2c;
`;
const FlatList = styled.FlatList`
    flex: 1;
    background-color: #FFF;
`;
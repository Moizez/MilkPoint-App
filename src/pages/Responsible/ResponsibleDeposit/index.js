import React, { useState, useEffect } from 'react'
import { RefreshControl } from 'react-native'
import styled from 'styled-components/native'

import Api from '../../../services/responsable.api'
import Header from '../../../components/Header'
import PendingDepositsList from '../PendingDepositsList'
import Loader from '../../../components/Loader'
import EmptyListCard from '../../../components/Cards/EmptyListCard'

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
            <FlatList
                showsVerticalScrollIndicator={false}
                data={pendingDeposits}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <PendingDepositsList data={item} loadPage={loadPendingDeposits} />}
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

export default ResponsibleDeposit

const Container = styled.View`
    flex: 1;
    background-color: #292b2c;
`;
const FlatList = styled.FlatList`
    flex: 1;
    background-color: #FFF;
`;
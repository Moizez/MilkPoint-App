import React, { useState, useEffect, useContext } from 'react'
import { RefreshControl } from 'react-native'
import styled from 'styled-components/native'

import { RequestContext } from '../../../contexts/request'

import PendingWithdrawalsList from '../PendingWithdrawalsList'
import Header from '../../../components/Header'
import Loader from '../../../components/Loader'
import EmptyListCard from '../../../components/Cards/EmptyListCard'

const DairyWithdrawal = () => {

    const {
        pendingWithdrawalsList, loadPendingWithdrawalsDairy, loading
    } = useContext(RequestContext)
    const [isRefreshing, setIsRefreshing] = useState(false)

    useEffect(() => {
        loadPendingWithdrawalsDairy()
    }, [])

    const onRefreshList = () => {
        setIsRefreshing(true)
        loadPendingWithdrawalsDairy()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <Header msg={'Lista de retiradas pendentes'} />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={pendingWithdrawalsList}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <PendingWithdrawalsList data={item} loadPage={loadPendingWithdrawalsDairy} />}
                ListEmptyComponent={
                    <EmptyListCard
                        iconLeft={'gesture-swipe-down'}
                        iconRight={'gesture-tap'}
                        infoLeft={'Clique e arraste para atualizar a lista.'}
                        infoRight={'Clique na solicitação para cancelar.'}
                    />
                }
            />
            {loading && !isRefreshing && <Loader />}
        </Container>
    );
}

export default DairyWithdrawal

const Container = styled.View`
    flex: 1;
    background-color: #292b2c;
`;
const FlatList = styled.FlatList`
    flex: 1;
    background-color: #FFF;
`;


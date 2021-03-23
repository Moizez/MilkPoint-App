import React, { useState, useEffect, useContext } from 'react'
import { RefreshControl } from 'react-native'
import styled from 'styled-components/native'

import { RequestContext } from '../../../contexts/request'

import PendingDepositsList from '../PendingDepositsList'
import Header from '../../../components/Header'
import Loader from '../../../components/Loader'
import EmptyListCard from '../../../components/Cards/EmptyListCard'

const ProducerDeposit = () => {

    const {
        pendingDepositsList, loadPendingDepositsProducer, loading
    } = useContext(RequestContext)
    const [isRefreshing, setIsRefreshing] = useState(false)

    useEffect(() => {
        loadPendingDepositsProducer()
    }, [])

    const onRefreshList = () => {
        setIsRefreshing(true)
        loadPendingDepositsProducer()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <Header msg={'Lista de depósitos pendentes'} />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={pendingDepositsList}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <PendingDepositsList data={item} loadPage={loadPendingDepositsProducer} />}
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

export default ProducerDeposit

const Container = styled.View`
    flex: 1;
    background-color: #292b2c;
`;
const FlatList = styled.FlatList`
    flex: 1;
    background-color: #FFF;
`;
import React, { useState, useEffect, useContext } from 'react';
import { RefreshControl } from 'react-native'
import styled from 'styled-components/native'

import { RequestContext } from '../../../contexts/request'
import Header from '../../../components/Header'
import TanksList from '../TanksList'
import Loader from '../../../components/Loader'
import EmptyListCard from '../../../components/Cards/EmptyListCard'

const ResponsibleHome = () => {

    const [isRefreshing, setIsRefreshing] = useState(false)
    const { responsibleTank, loadResponsibleTank, loading } = useContext(RequestContext)

    useEffect(() => {
        loadResponsibleTank()
    }, [])

    const onRefreshList = () => {
        setIsRefreshing(true)
        loadResponsibleTank()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <Header msg={'Lista de tanques'} />

            <FlatList
                showsVerticalScrollIndicator={false}
                data={responsibleTank}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <TanksList data={item} loadPage={loadResponsibleTank} />}
                ListEmptyComponent={
                    <EmptyListCard
                        iconLeft={'gesture-swipe-down'}
                        iconRight={'gesture-tap'}
                        infoLeft={'Clique e arraste para atualizar a lista.'}
                        infoRight={'Clique no tanque para mais detalhes.'}
                    />
                }
            />
            {loading && !isRefreshing && <Loader />}
        </Container>
    );
}

export default ResponsibleHome

const Container = styled.View`
    flex: 1;
    background-color: #292b2c;
`;
const FlatList = styled.FlatList`
    flex: 1;
    background-color: #FFF;
`;
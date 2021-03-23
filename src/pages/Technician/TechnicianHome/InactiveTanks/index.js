import React, { useState } from 'react'
import { RefreshControl } from 'react-native'
import styled from 'styled-components/native'

import TanksList from '../../TanksList'
import Loader from '../../../../components/Loader'
import EmptyListCard from '../../../../components/Cards/EmptyListCard'

const InactiveTanks = ({ data, loadPage, loading }) => {

    const [isRefreshing, setIsRefreshing] = useState(false)

    const onRefreshList = () => {
        setIsRefreshing(true)
        loadPage()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <TanksList data={item} />}
                ListEmptyComponent={
                    <EmptyListCard
                    iconLeft={'gesture-tap'}
                    iconRight={'gesture-swipe-horizontal'}
                    infoLeft={'Clique no tanque para mais detalhes.'}
                    infoRight={'Arraste na horizontal para editar ou ativar.'}
                />
                }
            />
            {loading && <Loader />}
        </Container>
    );
}

export default InactiveTanks

const Container = styled.View`
    flex: 1;
    background-color: #292b2c;
`;
const FlatList = styled.FlatList`
    flex: 1;
    background-color: #FFF;
`;
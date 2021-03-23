import React, { useState, useEffect } from 'react'
import { RefreshControl } from 'react-native'
import styled from 'styled-components/native'

import Api from '../../../services/api'

import TanksList from '../TanksList'
import Header from '../../../components/Header'
import Loader from '../../../components/Loader'
import EmptyListCard from '../../../components/Cards/EmptyListCard'

const ProducerHome = () => {

    const [tanks, setTanks] = useState([])
    const [loading, setLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const loadTanks = async () => {
        setLoading(true)
        const response = await Api.getTanks()
        setTanks(response)
        setLoading(false)
    }

    useEffect(() => {
        loadTanks()
    }, [])

    const onRefreshList = () => {
        setIsRefreshing(true)
        loadTanks()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <Header msg={'Lista de tanques'} />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={tanks}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <TanksList data={item} loadTanks={loadTanks} />}
                ListEmptyComponent={
                    <EmptyListCard
                        iconLeft={'gesture-swipe-down'}
                        iconRight={'gesture-tap-hold'}
                        infoLeft={'Clique e arraste para atualizar a lista.'}
                        infoRight={'Clique e segure no tanque para mais detalhes.'}
                    />
                }
            />
            {loading && !isRefreshing && <Loader />}
        </Container >
    );
}

export default ProducerHome

const Container = styled.View`
    flex: 1;
    background-color: #292b2c;
`;
const FlatList = styled.FlatList`
    flex: 1;
    background-color: #FFF;
`;
import React, { useState, useEffect, useContext } from 'react';
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Api from '../../../services/dairy.api'

import PendingWithdrawalsList from '../PendingWithdrawalsList'
import Header from '../../../components/Header'
import Loader from '../../../components/Loader'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

const DairyWithdrawals = () => {

    const [withdrawalsList, setWithdrawalsList] = useState([])
    const [loading, setLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const loadDairyWithdrawals = async () => {
        setLoading(true)
        const response = await Api.getPendingWithdrawalsDairy()
        setWithdrawalsList(response)
        setLoading(false)
    }

    useEffect(() => {
        loadDairyWithdrawals()
    }, [])

    const onRefreshList = async () => {
        setIsRefreshing(true)
        await loadDairyWithdrawals()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <Header msg={'Lista de retiradas pendentes'} />
            <List
                showsVerticalScrollIndicator={false}
                data={withdrawalsList}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <PendingWithdrawalsList data={item} onRefresh={onRefreshList} />}
                ListEmptyComponent={
                    <BoxNomeAviso>
                        <NomeAviso style={{ marginBottom: 70 }}>Não há registros!</NomeAviso>
                        <NomeAviso style={{ marginBottom: 15 }}>{<Icon name='lightbulb-on-outline' color='#adb5bd' size={25} />} Dicas</NomeAviso>
                        <BoxIconAviso>
                            <BoxIconUpdate>
                                <Icon name='gesture-swipe-down' color='#adb5bd' size={60} />
                                <NomeAviso>Clique e arraste para atualizar a lista</NomeAviso>
                            </BoxIconUpdate>
                            <BoxIconDelete>
                                <Icon name='gesture-tap-hold' color='#adb5bd' size={60} />
                                <NomeAviso>Clique para cancelar uma retirada</NomeAviso>
                            </BoxIconDelete>
                        </BoxIconAviso>
                    </BoxNomeAviso>}
            />
            {loading && !isRefreshing && <Loader />}
        </Container>
    );
}

export default DairyWithdrawals
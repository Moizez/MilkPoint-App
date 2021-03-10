import React, { useState, useEffect, useContext } from 'react';
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import PendingWithdrawalsList from '../PendingWithdrawalsList'
import Header from '../../../components/Header'
import { RequestContext } from '../../../contexts/request'
import Loader from '../../../components/Loader'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

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
            <List
                showsVerticalScrollIndicator={false}
                data={pendingWithdrawalsList}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <PendingWithdrawalsList data={item} loadPage={loadPendingWithdrawalsDairy} />}
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

export default DairyWithdrawal
import React, { useState, useEffect, useContext } from 'react';
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import PendingDepositsList from '../PendingDepositsList'
import Header from '../../../components/Header'
import Loader from '../../../components/Loader'

import Api from '../../../services/producer.api'
import { AuthContext } from '../../../contexts/auth'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

const ProducerDeposit = () => {

    //const { pendingDepositsList, loadPendingDepositsProducer } = useContext(AuthContext)

    const [depositsList, setDepositsList] = useState([])
    const [loading, setLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const loadProducerDeposits = async () => {
        setLoading(true)
        const response = await Api.getPendingDepositsProducer()
        setDepositsList(response)
        setLoading(false)
    }

    useEffect(() => {
        loadProducerDeposits()
    }, [])

    const onRefreshList = () => {
        setIsRefreshing(true)
        loadProducerDeposits()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <Header msg={'Lista de depósitos pendentes'} />
            <List
                showsVerticalScrollIndicator={false}
                data={depositsList}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => (<PendingDepositsList data={item} loadProducerDeposits={loadProducerDeposits} />)}
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
                                <NomeAviso>Clique para cancelar um depósito</NomeAviso>
                            </BoxIconDelete>
                        </BoxIconAviso>
                    </BoxNomeAviso>}
            />
            {loading && !isRefreshing && <Loader />}
        </Container>
    );
}

export default ProducerDeposit
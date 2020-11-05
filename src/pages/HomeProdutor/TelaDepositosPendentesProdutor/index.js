import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import ListaDepositosPendentes from '../ListaDepositosPendentes'
import Header from '../../../components/Header'
import Loader from '../../../components/Loader'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

export default function TelaDepositosPendentesProdutor() {

    const { loadListPendentesProdutor, depositoPendenteProdutor, loadingPages } = useContext(AuthContext)
    const [isRefreshing, setIsRefreshing] = useState(false)

    useEffect(() => {
        loadListPendentesProdutor()
    }, [])

    const onRefreshList = async () => {
        setIsRefreshing(true)
        await loadListPendentesProdutor()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <Header msg={'Lista de depósitos pendentes'} />
            <List
                showsVerticalScrollIndicator={false}
                data={depositoPendenteProdutor}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => (<ListaDepositosPendentes data={item} onRefresh={onRefreshList} />)}
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
            {loadingPages && !isRefreshing && <Loader />}
        </Container>
    );
}
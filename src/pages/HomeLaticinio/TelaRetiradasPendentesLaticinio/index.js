import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import ListaRetiradasPendentes from '../ListaRetiradasPendentes'
import Header from '../../../components/Header'
import Loader from '../../../components/Loader'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

export default function TelaRetiradasPendentesLaticinio() {

    const { loadListPendentesLaticinio, retiradaPendenteLaticinio, loadingPages } = useContext(AuthContext)
    const [isRefreshing, setIsRefreshing] = useState(false)

    useEffect(() => {
        loadListPendentesLaticinio()
    }, [])

    const onRefreshList = async () => {
        setIsRefreshing(true)
        await loadListPendentesLaticinio()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <Header msg={'Lista de retiradas pendentes'} />
            <List
                showsVerticalScrollIndicator={false}
                data={retiradaPendenteLaticinio}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <ListaRetiradasPendentes data={item} onRefresh={onRefreshList} />}
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
            {loadingPages && !isRefreshing && <Loader />}
        </Container>
    );
}
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import ListaRetiradasPendentes from '../ListaRetiradasPendentes'
import Header from '../../../components/Header'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

export default function TelaRetiradasPendentesLaticinio() {

    const { user, loadListRetiradasPendentes, retiradaPendente } = useContext(AuthContext)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const retiradasPendentes = retiradaPendente.filter(function (retirada) {
        return retirada.laticinio.id == user.id
    })

    useEffect(() => {
        loadListRetiradasPendentes()
    }, [])

    async function onRefreshList() {
        setIsRefreshing(true)
        await loadListRetiradasPendentes()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <Header nameList={'Lista de retiradas pendentes'} />
            <List
                showsVerticalScrollIndicator={false}
                data={retiradasPendentes}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <ListaRetiradasPendentes data={item} onRefresh={onRefreshList} />}
                ListEmptyComponent={
                    <BoxNomeAviso>
                        <NomeAviso style={{ marginBottom: 70 }}>Não há registro de transações!</NomeAviso>
                        <NomeAviso style={{ marginBottom: 15 }}>{<Icon name='lightbulb-on-outline' color='#adb5bd' size={25} />} Dicas</NomeAviso>
                        <BoxIconAviso>
                            <BoxIconUpdate>
                                <Icon name='gesture-swipe-down' color='#adb5bd' size={60} />
                                <NomeAviso>Clique e arraste para atualizar a lista</NomeAviso>
                            </BoxIconUpdate>
                            <BoxIconDelete>
                                <Icon name='gesture-tap-hold' color='#adb5bd' size={60} />
                                <NomeAviso>Clique e segure para cancelar uma retirada</NomeAviso>
                            </BoxIconDelete>
                        </BoxIconAviso>
                    </BoxNomeAviso>}
            />
        </Container>
    );
}
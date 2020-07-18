import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import ListaDepositosPendentes from '../ListaDepositosPendentes'
import Header from '../../../components/Header'

import {
    Container, BoxNomeAviso, NomeAviso, Box, Titulo, List, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

export default function TelaDepositosPendentesProdutor() {

    const { user, loadListDepositosPendentes, depositoPendente } = useContext(AuthContext)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const depositosPendentes = depositoPendente.filter(function (deposito) {
        return deposito.produtor.id == user.id
    })

    useEffect(() => {
        loadListDepositosPendentes()
    }, [])

    async function onRefreshList() {
        setIsRefreshing(true)
        await loadListDepositosPendentes()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <Header nameList={'Lista de depósitos pendentes'}/> 
            <List
                showsVerticalScrollIndicator={false}
                data={depositosPendentes}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => (<ListaDepositosPendentes data={item} onRefresh={onRefreshList} />)}
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
                                <NomeAviso>Clique e segure para cancelar um depósito</NomeAviso>
                            </BoxIconDelete>
                        </BoxIconAviso>
                    </BoxNomeAviso>}
            />
        </Container>
    );
}
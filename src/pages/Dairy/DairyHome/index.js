import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Api from '../../../services/api'

import TanksList from '../TanksList'
import Header from '../../../components/Header'
import Loader from '../../../components/Loader'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso, BoxIconUpdate, BoxIconDelete
} from './styles'

const DairyHome = () => {

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
            <List
                showsVerticalScrollIndicator={false}
                data={tanks}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <TanksList data={item} loadTanques={loadTanks} />}
                ListEmptyComponent={
                    <BoxNomeAviso>
                        <NomeAviso style={{ marginBottom: 70 }}>Nenhum tanques disponíveis!</NomeAviso>
                        <NomeAviso style={{ marginBottom: 15 }}>{<Icon name='lightbulb-on-outline' color='#adb5bd' size={25} />} Dicas</NomeAviso>
                        <BoxIconAviso>
                            <BoxIconUpdate>
                                <Icon name='gesture-swipe-down' color='#adb5bd' size={60} />
                                <NomeAviso>Clique e arraste para atualizar os tanques</NomeAviso>
                            </BoxIconUpdate>
                            <BoxIconDelete>
                                <Icon name='gesture-tap-hold' color='#adb5bd' size={60} />
                                <NomeAviso>Clique e segure no tanque para mais detalhes</NomeAviso>
                            </BoxIconDelete>
                        </BoxIconAviso>
                    </BoxNomeAviso>}
            />
            {loading && !isRefreshing && <Loader />}
        </Container>
    );
}

export default DairyHome
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RefreshControl } from 'react-native'

import Api from '../../../../services/technician.api'
import Loader from '../../../../components/Loader'
import TanksList from '../../TanksList'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso, BoxIconUpdate, BoxIconDelete
} from '../styles'

const ActiveTanks = () => {

    const [activeTanks, setActiveTanks] = useState([])
    const [loading, setLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const loadActiveTanks = async () => {
        setLoading(true)
        const response = await Api.getActiveTanks()
        setActiveTanks(response)
        setLoading(false)
    }

    useEffect(() => {
        loadActiveTanks()
    }, [])

    const onRefreshList = () => {
        setIsRefreshing(true)
        loadActiveTanks()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <List
                showsVerticalScrollIndicator={false}
                data={activeTanks}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <TanksList data={item} loadPage={loadActiveTanks}/>}
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
                    </BoxNomeAviso>
                }
            />
            {loading && <Loader />}
        </Container>
    );
}

export default ActiveTanks
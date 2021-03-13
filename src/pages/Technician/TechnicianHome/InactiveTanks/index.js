import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RefreshControl } from 'react-native'

import Api from '../../../../services/technician.api'
import Loader from '../../../../components/Loader'
import TanksList from '../../TanksList'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso, BoxIconUpdate, BoxIconDelete
} from '../styles'

const InactiveTanks = () => {

    const [inactiveTanks, setInactiveTanks] = useState([])
    const [loading, setLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const loadInactiveTanks = async () => {
        setLoading(true)
        const response = await Api.getInactiveTanks()
        setInactiveTanks(response)
        setLoading(false)
    }

    useEffect(() => {
        loadInactiveTanks()
    }, [])

    const onRefreshList = () => {
        setIsRefreshing(true)
        loadInactiveTanks()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <List
                showsVerticalScrollIndicator={false}
                data={inactiveTanks}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <TanksList data={item} loadPage={loadInactiveTanks} />}
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

export default InactiveTanks
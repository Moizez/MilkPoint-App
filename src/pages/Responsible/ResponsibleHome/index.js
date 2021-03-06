import React, { useContext, useState, useEffect } from 'react';
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Header from '../../../components/Header'
import TanksList from '../TanksList'
import Loader from '../../../components/Loader'

import Api from '../../../services/responsable.api'

import {
    Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
    BoxIconUpdate, BoxIconDelete
} from './styles'

const ResponsibleHome = () => {

    const [tanks, setTanks] = useState([])
    const [loading, setLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const loadResponsibleTanks = async () => {
        setLoading(true)
        const response = await Api.getResponsibleTanks()
        setTanks(response)
        setLoading(false)
    }

    const onLoader = (value) => {
        setLoading(value)
    }

    useEffect(() => {
        loadResponsibleTanks()
    }, [])

    const onRefreshList = () => {
        setIsRefreshing(true)
        loadResponsibleTanks()
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
                renderItem={({ item }) => <TanksList data={item} onLoader={onLoader} />}
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

export default ResponsibleHome
import React, { useState, useEffect, useContext } from 'react'
import { Text, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import styled from 'styled-components/native'

import ProducerApi from '../../services/producer.api'
import DairyApi from '../../services/dairy.api'
import { AuthContext } from '../../contexts/auth'

import Movements from './Movements'
import Specifications from './Specifications'
import SimpleHeader from '../../components/SimpleHeader'

const initialLayout = { width: Dimensions.get('window').width };

const TankDetails = ({ route }) => {

    const navigation = useNavigation()
    const { user } = useContext(AuthContext)

    const { data } = route.params
    const { data: { id, nome } } = route.params

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'first', title: 'Características' },
        { key: 'second', title: 'Movimentações' },
    ])

    const [allConfirmedDeposits, setAllConfirmedDeposits] = useState([])
    const [userConfirmedDeposits, setUserConfirmedDeposits] = useState([])
    const [allConfirmedWithdrawals, setAllConfirmedWithdrawals] = useState([])
    const [userConfirmedWithdrawals, setUserConfirmedWithdrawals] = useState([])

    const getAllConfirmedDeposits = async () => {
        const response = await ProducerApi.getAllDepositsConfirmedOrCanceled('confirmados')
        const result = response.filter(i => i.tanque.responsavel.id === user.id)
        setAllConfirmedDeposits(result)
    }

    const getUserConfirmedDeposits = async () => {
        const response = await ProducerApi.getAllDepositsConfirmedOrCanceledUser('confirmados')
        const result = await response.filter(i => i.tanque.id === id)
        setUserConfirmedDeposits(result)
    }

    const getAllConfirmedWithdrawals = async () => {
        const response = await DairyApi.getAllWithdrawalsConfirmedOrCanceled('confirmados')
        const result = response.filter(i => i.tanque.responsavel.id === user.id)
        setAllConfirmedWithdrawals(result)
    }

    const getUserConfirmedWithdrawals = async () => {
        const response = await DairyApi.getAllWithdrawalsConfirmedOrCanceledUser('confirmados')
        const result = await response.filter(i => i.tanque.id === id)
        setUserConfirmedWithdrawals(result)
    }

    useEffect(() => {
        getAllConfirmedDeposits()
        getUserConfirmedDeposits()
    }, [])

    useEffect(() => {
        getAllConfirmedWithdrawals()
        getUserConfirmedWithdrawals()
    }, [])

    const userDepositData = user.perfil === 1 ? userConfirmedDeposits : allConfirmedDeposits
    const userWithdrawalData = user.perfil === 3 ? userConfirmedWithdrawals : allConfirmedWithdrawals

    const renderTabBar = props => (
        <TabBar {...props}
            renderLabel={({ route, color }) => (
                <Text style={{ color, fontSize: 15, height: 30 }}>
                    {route.title}
                </Text>
            )}
            indicatorStyle={{ backgroundColor: '#FFF' }}
            style={{ backgroundColor: '#292b2c', height: 35 }}
        />
    );

    const renderScene = SceneMap({
        first: () =>
            <Specifications
                data={data}
            />,
        second: () =>
            <Movements
                userDepositData={userDepositData}
                userWithdrawalData={userWithdrawalData}
            />,
    });

    return (
        <Container>
            <SimpleHeader
                title={`Tanque: ${nome}`}
                button={true}
                action={() => navigation.goBack()}
            />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={renderTabBar}
            />

        </Container>
    );
}

export default TankDetails

const Container = styled.View` flex: 1;`;
const CloseButton = styled.TouchableOpacity` 
    background-color: #FFF;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    position: absolute;
    top: 15px;
    left: 15px;
`;

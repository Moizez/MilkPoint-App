import React, { useState, useEffect } from 'react';
import { Text, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import Api from '../../../services/responsable.api'

import Header from '../../../components/Header'
import HistoricDeposits from './HistoricDeposits'
import HistoricWithdrawals from './HistoricWithdrawals'

const initialLayout = { width: Dimensions.get('window').width };

const ResponsibleHistoric = () => {

    const [index, setIndex] = useState(0)
    const [depositData, setDepositData] = useState([])
    const [withdrawalData, setWithdrawal] = useState([])


    const [routes] = useState([
        { key: 'first', title: 'Depósitos' },
        { key: 'second', title: 'Retiradas' },
    ])


    const loadDepositData = async () => {
        const response = await Api.getAllDepositsOrWithdrawalsResolved('deposito')
        setDepositData(response)
    }

    const loadWithdrawalData = async () => {
        const response = await Api.getAllDepositsOrWithdrawalsResolved('retirada')
        setWithdrawal(response)
    }

    useEffect(() => {
        loadDepositData()
        loadWithdrawalData()
    }, [])

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
        first: () => <HistoricDeposits data={depositData} loadDepositData={loadDepositData} />,
        second: () => <HistoricWithdrawals data={withdrawalData} loadWithdrawalData={loadWithdrawalData} />,
    });

    return (
        <Container>
            <Header showNameList={true} sizeNameList={147} />

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

export default ResponsibleHistoric

const Container = styled.View`flex: 1`;
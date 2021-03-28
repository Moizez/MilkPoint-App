import React, { useState, useEffect, useContext } from 'react';
import { Text, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { RequestContext } from '../../../contexts/request'

import Header from '../../../components/Header'
import HistoricDeposits from './HistoricDeposits'
import HistoricWithdrawals from './HistoricWithdrawals'

const initialLayout = { width: Dimensions.get('window').width };

const ResponsibleHistoric = () => {

    const {
        resolvedDeposits, loadResolvedDeposits,
        resolvedWithdrawals, loadResolvedWithdrawals,
        loading
    } = useContext(RequestContext)

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'first', title: 'Depósitos' },
        { key: 'second', title: 'Retiradas' },
    ])


    useEffect(() => {
        loadResolvedDeposits()
        loadResolvedWithdrawals()
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
        first: () => <HistoricDeposits
            data={resolvedDeposits}
            loading={loading}
            load={loadResolvedDeposits}
        />,
        second: () => <HistoricWithdrawals
            data={resolvedWithdrawals}
            loading={loading}
            load={loadResolvedWithdrawals}
        />
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
import React, { useState, useContext, useEffect } from 'react';
import { Text, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

import { RequestContext } from '../../../contexts/request'

import Header from '../../../components/Header'
import ConfirmedWithdrawals from './ConfirmedWithdrawals'
import CanceledWithdrawals from './CanceledWithdrawals'

const initialLayout = { width: Dimensions.get('window').width };

const ProducerHistoric = () => {

    const {
        confirmedWithdrawals, loadConfirmedWithdrawals,
        canceledWithdrawals, loadCanceledWithdrawals,
        loading
    } = useContext(RequestContext)

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'first', title: 'Confirmados' },
        { key: 'second', title: 'Cancelados' },
    ])

    useEffect(() => {
        loadConfirmedWithdrawals()
        loadCanceledWithdrawals()
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
        first: () => <ConfirmedWithdrawals
            data={confirmedWithdrawals}
            loading={loading}
            load={loadConfirmedWithdrawals}
        />,
        second: () => <CanceledWithdrawals
            data={canceledWithdrawals}
            loading={loading}
            load={loadConfirmedWithdrawals}
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

export default ProducerHistoric

const Container = styled.View`flex: 1`;
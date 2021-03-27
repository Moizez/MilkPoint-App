import React, { useState, useContext, useEffect } from 'react';
import { Text, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

import { RequestContext } from '../../../contexts/request'

import Header from '../../../components/Header'
import ConfirmedDeposits from './ConfirmedDeposits'
import CanceledDeposits from './CanceledDeposits'

const initialLayout = { width: Dimensions.get('window').width };

const ProducerHistoric = () => {

    const {
        confirmedDeposits, loadConfirmedDeposits,
        canceledDeposits, loadCanceledDeposits,
        loading
    } = useContext(RequestContext)

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'first', title: 'Confirmados' },
        { key: 'second', title: 'Cancelados' },
    ])

    useEffect(() => {
        loadConfirmedDeposits()
        loadCanceledDeposits()
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
        first: () => <ConfirmedDeposits
            data={confirmedDeposits}
            loading={loading}
            load={loadConfirmedDeposits}
        />,
        second: () => <CanceledDeposits
            data={canceledDeposits}
            loading={loading}
            load={loadCanceledDeposits}
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
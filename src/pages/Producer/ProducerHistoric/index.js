import React, { useState, useContext } from 'react';
import { Text, Dimensions, RefreshControl } from 'react-native'
import styled from 'styled-components/native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { AuthContext } from '../../../contexts/auth'
import Api from '../../../services/producer.api'

import Header from '../../../components/Header'
import ConfirmedDeposits from './ConfirmedDeposits'
import CanceledDeposits from './CanceledDeposits'

const initialLayout = { width: Dimensions.get('window').width };

const ProducerHistoric = () => {

    const { user } = useContext(AuthContext)

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'first', title: 'Confirmados' },
        { key: 'second', title: 'Cancelados' },
    ])

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
        first: () => <ConfirmedDeposits />,
        second: () => <CanceledDeposits />,
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
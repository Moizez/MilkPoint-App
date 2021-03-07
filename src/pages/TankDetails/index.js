import React, { useState } from 'react'
import { Text, Dimensions } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Divider } from 'react-native-paper';
import styled from 'styled-components/native';

import Movements from './Movements'
import Specifications from './Specifications'

const initialLayout = { width: Dimensions.get('window').width };

const TankDetails = ({ route }) => {

    const { data } = route.params

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'first', title: 'Características' },
        { key: 'second', title: 'Movimentações' },
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
        first: () => <Specifications data={data} />,
        second: () => <Movements data={data} />,
    });

    return (
        <Container>
            <TitleBox>
                <Title>Tanque: <Title style={{ color: '#da1e37' }}>{data.nome}</Title></Title>
            </TitleBox>
            <Divider />
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
const TitleBox = styled.View` 
    height: 80px;
    align-items: center;
    justify-content: center;
    background-color: #292b2c;
`;
const Title = styled.Text`
    font-size: 20px;
    color: #FFF;
    text-align: center;
`;
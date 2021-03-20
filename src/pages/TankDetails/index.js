import React, { useState } from 'react'
import { Text, Dimensions } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

import Movements from './Movements'
import Specifications from './Specifications'
import SimpleHeader from '../../components/SimpleHeader'

const initialLayout = { width: Dimensions.get('window').width };

const TankDetails = ({ route }) => {

    const navigation = useNavigation()
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
            <SimpleHeader title={`Tanque: ${data.nome}`} />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={renderTabBar}
            />

            <CloseButton onPress={() => navigation.goBack()}>
                <Icon name='chevron-down' color='#292b2c' size={24} />
            </CloseButton>
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
    top: 10px;
    left: 12px;
`;

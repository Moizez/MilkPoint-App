import React, { useState, useEffect, useContext, Fragment } from 'react'
import FAB  from 'react-native-paper/lib/module/components/FAB/FAB'
import { StyleSheet, Dimensions, Text } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native'

import { RequestContext } from '../../../contexts/request'

import Header from '../../../components/Header'
import ActiveTanks from './ActiveTanks'
import InactiveTanks from './InactiveTanks'

const initialLayout = { width: Dimensions.get('window').width };

const TechnicianHome = () => {

    const navigation = useNavigation()
    const {
        activeTanks, loadActiveTanks, inactiveTanks, loadInactiveTanks, loading
    } = useContext(RequestContext)

    useEffect(() => {
        loadActiveTanks()
        loadInactiveTanks()
    }, [])

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'first', title: 'Tanques Ativos' },
        { key: 'second', title: 'Tanques Inativos' },
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
        first: () => <ActiveTanks data={activeTanks} loadPage={loadActiveTanks} loading={loading} />,
        second: () => <InactiveTanks data={inactiveTanks} loadPage={loadInactiveTanks} loading={loading} />
    });

    return (
        <Fragment>
            <Header showNameList={true} sizeNameList={147} />

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={renderTabBar}
            />

            <FAB
                style={styles.fab}
                icon="plus"
                color='#FFF'
                onPress={() => navigation.navigate('CreateTankForm')}
            />
        </Fragment>
    );
}

const styles = StyleSheet.create({
    fab: {
        backgroundColor: '#00b4d8',
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})

export default TechnicianHome
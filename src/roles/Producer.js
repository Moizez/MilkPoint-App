import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ProducerHome from '../pages/Producer/ProducerHome'
import ProducerHistoric from '../pages/Producer/ProducerHistoric'
import ProducerDeposit from '../pages/Producer/ProducerDeposit'
import Settings from '../pages/SingleStacks/Settings'

const ProducerTab = createBottomTabNavigator()

const icons = {
    ProducerHome: {
        lib: MaterialCommunityIcons,
        name: 'home'
    },
    ProducerDeposit: {
        lib: MaterialCommunityIcons,
        name: 'basket-fill'
    },
    ProducerHistoric: {
        lib: MaterialCommunityIcons,
        name: 'archive'
    },
    Settings: {
        lib: MaterialCommunityIcons,
        name: 'dots-vertical'
    },
}

const Producer = () => {
    return (
        <ProducerTab.Navigator
            initialRouteName='Home'
            backBehavior='initialRoute'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    const { lib: Icon, name } = icons[route.name]
                    return <Icon name={name} color={color} size={28} />
                }
            })}
            tabBarOptions={{
                style: {
                    backgroundColor: '#292b2c',
                    borderTopColor: 'rgba(0,0,0,0.5)',
                    height: 60,
                },
                activeTintColor: '#2a9d8f',
                labelStyle: {
                    fontSize: 11,
                    marginBottom: 5
                }
            }}

        >
            <ProducerTab.Screen
                name='ProducerHome'
                component={ProducerHome}
                options={{
                    title: 'Início'
                }}
            />

            <ProducerTab.Screen
                name='ProducerDeposit'
                component={ProducerDeposit}
                options={{
                    title: 'Depósitos'
                }}
            />

            <ProducerTab.Screen
                name='ProducerHistoric'
                component={ProducerHistoric}
                options={{
                    title: 'Histórico'
                }}
            />

            <ProducerTab.Screen
                name='Settings'
                component={Settings}
                options={{
                    title: 'Mais'
                }}
            />
        </ProducerTab.Navigator>
    )
}

export default Producer
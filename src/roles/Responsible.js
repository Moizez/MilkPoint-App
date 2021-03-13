import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ResponsibleHome from '../pages/Responsible/ResponsibleHome'
import ResponsibleDeposit from '../pages/Responsible/ResponsibleDeposit'
import ResponsibleWithdrawal from '../pages/Responsible/ResponsibleWithdrawal'
import ResponsibleHistoric from '../pages/Responsible/ResponsibleHistoric'
import Settings from '../pages/SingleStacks/Settings'

const ResponsibleTab = createBottomTabNavigator()

const icons = {
    ResponsibleHome: {
        lib: MaterialCommunityIcons,
        name: 'home'
    },
    ResponsibleDeposit: {
        lib: MaterialCommunityIcons,
        name: 'basket-fill'
    },
    ResponsibleWithdrawal: {
        lib: MaterialCommunityIcons,
        name: 'basket-unfill'
    },
    ResponsibleHistoric: {
        lib: MaterialCommunityIcons,
        name: 'archive'
    },
    Settings: {
        lib: MaterialCommunityIcons,
        name: 'dots-vertical'
    },
}

const Responsible = () => {
    return (
        <ResponsibleTab.Navigator
            initialRouteName='ResponsibleHome'
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
                activeTintColor: '#e7b705',
                labelStyle: {
                    fontSize: 11,
                    marginBottom: 5
                }
            }}

        >
            <ResponsibleTab.Screen
                name='ResponsibleHome'
                component={ResponsibleHome}
                options={{
                    title: 'Início'
                }}
            />

            <ResponsibleTab.Screen
                name='ResponsibleDeposit'
                component={ResponsibleDeposit}
                options={{
                    title: 'Depósitos'
                }}
            />

            <ResponsibleTab.Screen

                name='ResponsibleWithdrawal'
                component={ResponsibleWithdrawal}
                options={{
                    title: 'Retiradas'
                }}
            />

            <ResponsibleTab.Screen
                name='ResponsibleHistoric'
                component={ResponsibleHistoric}
                options={{
                    title: 'Histórico'
                }}
            />

            <ResponsibleTab.Screen
                name='Settings'
                component={Settings}
                options={{
                    title: 'Mais'
                }}
            />
        </ResponsibleTab.Navigator>
    )
}

export default Responsible
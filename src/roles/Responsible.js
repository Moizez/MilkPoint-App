import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ResponsibleHome from '../pages/HomeResponsavel'
import ResponsibleDeposit from '../pages/HomeResponsavel/TelaDepositosPendentesResponsavel'
import ResponsibleWithdrawal from '../pages/HomeResponsavel/TelaRetiradasPendentesResponsavel'
import ResponsibleHistoric from '../pages/HomeResponsavel/TelaHistoricoResponsavel'
import ResponsibleSettings from '../pages/TelaConfiguracao'

import ResponsibleProfile from '../pages/HomeResponsavel/TelaPerfilResponsavel'

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
    ResponsibleSettings: {
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
                inactiveTintColor: '#adb5bd',
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
                name='ResponsibleSettings'
                component={ResponsibleSettings}
                options={{
                    title: 'Mais'
                }}
            />

            <ResponsibleTab.Screen name='Perfil' component={ResponsibleProfile}
                options={{
                    tabBarButton: () => null,
                }}
            />

        </ResponsibleTab.Navigator>
    )
}

export default Responsible
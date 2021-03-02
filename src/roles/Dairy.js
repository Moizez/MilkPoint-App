import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import DairyHome from '../pages/HomeLaticinio'
import DairyWithdrawal  from '../pages/HomeLaticinio/TelaRetiradasPendentesLaticinio'
import DairyHistoric from '../pages/HomeLaticinio/TelaHistoricoLaticinio'
import DairySettings from '../pages/TelaConfiguracao'

import DairyProfile from '../pages/HomeLaticinio/TelaPerfilLaticinio'

const DairyTab = createBottomTabNavigator()

const icons = {
    DairyHome: {
        lib: MaterialCommunityIcons,
        name: 'home'
    },
    DairyWithdrawal: {
        lib: MaterialCommunityIcons,
        name: 'basket-unfill'
    },
    DairyHistoric: {
        lib: MaterialCommunityIcons,
        name: 'archive'
    },
    DairySettings: {
        lib: MaterialCommunityIcons,
        name: 'dots-vertical'
    },
}

const Dairy = () => {
    return (
        <DairyTab.Navigator
            initialRouteName='Home'
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
                activeTintColor: '#d00000',
                inactiveTintColor: '#adb5bd',
                labelStyle: {
                    fontSize: 11,
                    marginBottom: 5
                }
            }}

        >
            <DairyTab.Screen
                name='DairyHome'
                component={DairyHome}
                options={{
                    title: 'Início'
                }}
            />

            <DairyTab.Screen
                name='DairyWithdrawal'
                component={DairyWithdrawal}
                options={{
                    title: 'Retiradas'
                }}
            />

            <DairyTab.Screen
                name='DairyHistoric'
                component={DairyHistoric}
                options={{
                    title: 'Histórico'
                }}
            />

            <DairyTab.Screen
                name='DairySettings'
                component={DairySettings}
                options={{
                    title: 'Mais'
                }}
            />

            <DairyTab.Screen name='Perfil' component={DairyProfile}
                options={{
                    tabBarButton: () => null,
                }}
            />

        </DairyTab.Navigator>
    )
}

export default Dairy
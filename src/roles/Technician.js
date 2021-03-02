import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import TechnicianHome from '../pages/HomeTecnico'
import ProducerPage from '../pages/HomeTecnico/TelaProdutores'
import DairyPage from '../pages/HomeTecnico/TelaLaticinios'
import ResponsiblePage from '../pages/HomeTecnico/TelaResponsaveis'
import TechnicianSettings from '../pages/HomeTecnico/TechnicianSettings'

const TechnicianTab = createBottomTabNavigator()

const icons = {
    TechnicianHome: {
        lib: MaterialCommunityIcons,
        name: 'home'
    },
    ProducerPage: {
        lib: MaterialCommunityIcons,
        name: 'account-cowboy-hat'
    },
    DairyPage: {
        lib: MaterialCommunityIcons,
        name: 'account-tie'
    },
    ResponsiblePage: {
        lib: MaterialCommunityIcons,
        name: 'account-hard-hat'
    },
    TechnicianSettings: {
        lib: MaterialCommunityIcons,
        name: 'dots-vertical'
    },
}

const Technician = () => {
    return (
        <TechnicianTab.Navigator
            initialRouteName='TechnicianHome'
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
                activeTintColor: '#00abe7',
                labelStyle: {
                    fontSize: 11,
                    marginBottom: 5
                }
            }}

        >

            <TechnicianTab.Screen
                name='TechnicianHome'
                component={TechnicianHome}
                options={{
                    title: 'Início'
                }}
            />

            <TechnicianTab.Screen
                name='ProducerPage'
                component={ProducerPage}
                options={{
                    title: 'Produtores'
                }}
            />

            <TechnicianTab.Screen

                name='DairyPage'
                component={DairyPage}
                options={{
                    title: 'Laticínios'
                }}
            />

            <TechnicianTab.Screen
                name='ResponsiblePage'
                component={ResponsiblePage}
                options={{
                    title: 'Responsáveis'
                }}
            />

            <TechnicianTab.Screen
                name='TechnicianSettings'
                component={TechnicianSettings}
                options={{
                    title: 'Mais'
                }}
            />
        </TechnicianTab.Navigator>
    )
}

export default Technician
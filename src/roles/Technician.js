import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import TechnicianHome from '../pages/Technician/TechnicianHome'
import ProducersPage from '../pages/Technician/ProducersPage'
import DairiesPage from '../pages/Technician/DairiesPage'
import ResponsiblesPage from '../pages/Technician/ResponsiblesPage'
import Settings from '../pages/SingleStacks/Settings'

const TechnicianTab = createBottomTabNavigator()

const icons = {
    TechnicianHome: {
        lib: MaterialCommunityIcons,
        name: 'home'
    },
    ProducersPage: {
        lib: MaterialCommunityIcons,
        name: 'account-cowboy-hat'
    },
    DairiesPage: {
        lib: MaterialCommunityIcons,
        name: 'account-tie'
    },
    ResponsiblesPage: {
        lib: MaterialCommunityIcons,
        name: 'account-hard-hat'
    },
    Settings: {
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
                name='ProducersPage'
                component={ProducersPage}
                options={{
                    title: 'Produtores'
                }}
            />

            <TechnicianTab.Screen

                name='DairiesPage'
                component={DairiesPage}
                options={{
                    title: 'Laticínios'
                }}
            />

            <TechnicianTab.Screen
                name='ResponsiblesPage'
                component={ResponsiblesPage}
                options={{
                    title: 'Responsáveis'
                }}
            />

            <TechnicianTab.Screen
                name='Settings'
                component={Settings}
                options={{
                    title: 'Mais'
                }}
            />
        </TechnicianTab.Navigator>
    )
}

export default Technician
import React, { useState, useContext } from 'react';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer'

import { AuthContext } from '../contexts/auth'

import HomeProdutor from '../pages/HomeProdutor'
import HomeLaticinio from '../pages/HomeLaticinio'
import HomeResponsavel from '../pages/HomeResponsavel'

const AppDrawer = createDrawerNavigator()

function laticinioDrawer() {
    return (
        <AppDrawer.Navigator
            drawerStyle={{
                backgroundColor: '#FFF'
            }}
            drawerContentOptions={{
                labelStyle: {
                    fontWeight: 'bold',
                    fontSize: 16,
                },
                activeTintColor: '#FFF',
                activeBackgroundColor: '#292b2c',
                inactiveBackgroundColor: '#e9ecef',
                inactiveTintColor: '#6c757d',
                itemStyle: {
                    marginVertical: 5
                }
            }}
        >
            <AppDrawer.Screen name='Home Laticício' component={HomeLaticinio}></AppDrawer.Screen>
            <AppDrawer.Screen name='Sair' component={DrawerItem}></AppDrawer.Screen>
        </AppDrawer.Navigator>
    )
}

function responsavelDrawer() {
    return (
        <AppDrawer.Navigator
            drawerStyle={{
                backgroundColor: '#FFF'
            }}
            drawerContentOptions={{
                labelStyle: {
                    fontWeight: 'bold',
                    fontSize: 16,
                },
                activeTintColor: '#FFF',
                activeBackgroundColor: '#292b2c',
                inactiveBackgroundColor: '#e9ecef',
                inactiveTintColor: '#6c757d',
                itemStyle: {
                    marginVertical: 5
                }
            }}
        >
            <AppDrawer.Screen name='Home Responsável' component={HomeResponsavel}></AppDrawer.Screen>
            <AppDrawer.Screen name='Sair' component={DrawerItem}></AppDrawer.Screen>
        </AppDrawer.Navigator>
    )
}

export default function AppRoutes() {
    const { user } = useContext(AuthContext)

    if (user.perfil === 2) {
        return responsavelDrawer()
    } else if (user.perfil === 3) {
        return laticinioDrawer()
    } else if (user.perfil === 1) {

        return (
            <AppDrawer.Navigator
                drawerStyle={{
                    backgroundColor: '#FFF'
                }}
                drawerContentOptions={{
                    labelStyle: {
                        fontWeight: 'bold',
                        fontSize: 16,
                    },
                    activeTintColor: '#FFF',
                    activeBackgroundColor: '#292b2c',
                    inactiveBackgroundColor: '#e9ecef',
                    inactiveTintColor: '#6c757d',
                    itemStyle: {
                        marginVertical: 5
                    }
                }}
            >
                <AppDrawer.Screen name='Home Produtor' component={HomeProdutor} />
                <AppDrawer.Screen name='Sair' component={DrawerItem}></AppDrawer.Screen>
            </AppDrawer.Navigator>

        )
    } else {
        alert("Seu e-mail ou senha são inválidos!")
    }
}
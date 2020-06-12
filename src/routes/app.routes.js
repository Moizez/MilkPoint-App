import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeProdutor from '../pages/HomeProdutor'
import HomeLaticinio from '../pages/HomeLaticinio'

const AppDrawer = createDrawerNavigator()

export default function AppRoutes() {

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
            <AppDrawer.Screen name='Home Laticício' component={HomeLaticinio} />
            <AppDrawer.Screen name='Home Produtor' component={HomeProdutor} />
        </AppDrawer.Navigator>

    )
}
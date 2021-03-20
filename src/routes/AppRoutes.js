import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import { AuthContext } from '../contexts/auth'

//Roles import
import Producer from '../roles/Producer'
import Responsible from '../roles/Responsible'
import Dairy from '../roles/Dairy'
import Technician from '../roles/Technician'

// Stacks import
import ProfileDetails from '../pages/SingleStacks/ProfileDetails'
import TankDetails from '../pages/TankDetails'
import CreateTankForm from '../pages/Technician/CreateTankForm'
import UpdateTankForm from '../pages/Technician/UpdateTankForm'
import AppTips from '../pages/SingleStacks/AppTips'
import RouteMap from '../pages/SingleStacks/RouteMap'

const Stack = createStackNavigator()

const AppRoutes = () => {

    const { user } = useContext(AuthContext)

    if (user.perfil === 1) {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Producer' component={Producer} />
                <Stack.Screen name='TankDetails' component={TankDetails} />
                <Stack.Screen name='ProfileDetails' component={ProfileDetails} />
                <Stack.Screen name='AppTips' component={AppTips} />
                <Stack.Screen name='RouteMap' component={RouteMap} />
            </Stack.Navigator>
        )
    } else if (user.perfil === 2) {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Responsible' component={Responsible} />
                <Stack.Screen name='TankDetails' component={TankDetails} />
                <Stack.Screen name='ProfileDetails' component={ProfileDetails} />
                <Stack.Screen name='AppTips' component={AppTips} />
                <Stack.Screen name='RouteMap' component={RouteMap} />
            </Stack.Navigator>
        )
    } else if (user.perfil === 3) {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Dairy' component={Dairy} />
                <Stack.Screen name='TankDetails' component={TankDetails} />
                <Stack.Screen name='ProfileDetails' component={ProfileDetails} />
                <Stack.Screen name='AppTips' component={AppTips} />
                <Stack.Screen name='RouteMap' component={RouteMap} />
            </Stack.Navigator>
        )
    } else {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Technician' component={Technician} />
                <Stack.Screen name='TankDetails' component={TankDetails} />
                <Stack.Screen name='ProfileDetails' component={ProfileDetails} />
                <Stack.Screen name='CreateTankForm' component={CreateTankForm} />
                <Stack.Screen name='UpdateTankForm' component={UpdateTankForm} />
                <Stack.Screen name='AppTips' component={AppTips} />
                <Stack.Screen name='RouteMap' component={RouteMap} />
            </Stack.Navigator>
        )
    }
}

export default AppRoutes

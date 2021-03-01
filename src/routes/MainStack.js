import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

//My imports
import DetalhesTanque from '../pages/DetalhesTanque'

const Stack = createStackNavigator()

const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='TankDetails' component={DetalhesTanque} />
        </Stack.Navigator>
    );
}

export default MainStack
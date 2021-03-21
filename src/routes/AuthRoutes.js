import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

//Páginas
import SignIn from '../pages/SignIn'
import ForgotPassword from '../pages/SingleStacks/ForgotPassword'

const AuthStack = createStackNavigator()

const AuthRoutes = () => {

    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name='SignIn'
                component={SignIn}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name='ForgotPassword'
                component={ForgotPassword}
                options={{
                    headerStyle: {
                        backgroundColor: '#292b2c',
                        borderBottomWidth: 1,
                        borderBottomColor: '#FFF'
                    },
                    headerTintColor: '#FFF',
                    headerBackTitle: false,
                    headerTitle: 'Voltar',
                    headerShown: false
                }}
            />
        </AuthStack.Navigator>

    )
}

export default AuthRoutes


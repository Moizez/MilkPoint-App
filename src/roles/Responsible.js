import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeResponsavel from '../pages/HomeResponsavel'
import TelaDepositosPendentesResponsavel from '../pages/HomeResponsavel/TelaDepositosPendentesResponsavel'
import TelaRetiradasPendentesResponsavel from '../pages/HomeResponsavel/TelaRetiradasPendentesResponsavel'
import TelaHistoricoResponsavel from '../pages/HomeResponsavel/TelaHistoricoResponsavel'
import TelaPerfilResponsavel from '../pages/HomeResponsavel/TelaPerfilResponsavel'

//Páginas comuns a todos
import DetalhesTanque from '../pages/DetalhesTanque'
import TelaConfiguracao from '../pages/TelaConfiguracao'

const AppTab = createBottomTabNavigator()

const Responsible = () => {
    return (
        <AppTab.Navigator
            tabBarOptions={{
                activeTintColor: '#FFF',
                inactiveTintColor: '#000',
                tabBarPosition: 'bottom',
                animationEnabled: true,
                swipeEnabled: true,
                activeBackgroundColor: '#292b2c',
                inactiveBackgroundColor: '#FFF'
            }}>

            <AppTab.Screen name='Home' component={HomeResponsavel}
                options={{
                    tabBarLabel: 'Início',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={30} />
                    ),
                }} />

            <AppTab.Screen name='Depositos' component={TelaDepositosPendentesResponsavel}
                options={{
                    tabBarLabel: 'Depósitos',
                    tabBarIcon: ({ }) => (
                        <Icon name="basket-fill" color={'#2a9d8f'} size={30} />
                    ),
                }}
            />
            <AppTab.Screen name='Retiradas' component={TelaRetiradasPendentesResponsavel}
                options={{
                    tabBarLabel: 'Retiradas',
                    tabBarIcon: ({ }) => (
                        <Icon name="basket-unfill" color={'#da1e37'} size={30} />
                    ),
                }}

            />
            <AppTab.Screen name='Histórico' component={TelaHistoricoResponsavel}
                options={{
                    tabBarLabel: 'Histórico',
                    tabBarIcon: ({ }) => (
                        <Icon name="archive" color={'#fca311'} size={30} />
                    ),
                }}

            />
            <AppTab.Screen name='Mais' component={TelaConfiguracao}
                options={{
                    tabBarLabel: 'Mais',
                    tabBarIcon: ({ }) => (
                        <Icon name="dots-vertical" color={'#0077b6'} size={30} />
                    ),
                }}

            />

            <AppTab.Screen name='DetalhesTanque' component={DetalhesTanque}
                options={{
                    tabBarButton: () => null,
                }}
            />

            <AppTab.Screen name='Perfil' component={TelaPerfilResponsavel}
                options={{
                    tabBarButton: () => null,
                }}
            />
        </AppTab.Navigator>
    )
}

export default Responsible
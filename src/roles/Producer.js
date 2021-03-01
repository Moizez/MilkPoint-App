import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeProdutor from '../pages/HomeProdutor'
import TelaHistoricoProdutor from '../pages/HomeProdutor/TelaHistoricoProdutor'
import TelaDepositosPendentesProdutor from '../pages/HomeProdutor/TelaDepositosPendentesProdutor'
import TelaPerfilProdutor from '../pages/HomeProdutor/TelaPerfilProdutor'

//Páginas comuns a todos
import DetalhesTanque from '../pages/DetalhesTanque'
import TelaConfiguracao from '../pages/TelaConfiguracao'

const AppTab = createBottomTabNavigator()

const Producer = () => {
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

            <AppTab.Screen name='Home' component={HomeProdutor}
                options={{
                    tabBarLabel: 'Início',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={30} />
                    ),
                }}
            />
            <AppTab.Screen name='Depositos' component={TelaDepositosPendentesProdutor}
                options={{
                    tabBarLabel: 'Depósitos',
                    tabBarIcon: ({ }) => (
                        <Icon name="basket-fill" color={'#2a9d8f'} size={30} />
                    ),
                }}
            />
            <AppTab.Screen name='Histórico' component={TelaHistoricoProdutor}
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

            <AppTab.Screen name='Perfil' component={TelaPerfilProdutor}
                options={{
                    tabBarButton: () => null,
                }}
            />

        </AppTab.Navigator>
    )
}

export default Producer
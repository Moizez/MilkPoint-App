import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeTecnico from '../pages/HomeTecnico'
import TelaProdutores from '../pages/HomeTecnico/TelaProdutores'
import TelaLaticinios from '../pages/HomeTecnico/TelaLaticinios'
import TelaResponsaveis from '../pages/HomeTecnico/TelaResponsaveis'
import TelaPerfilTecnico from '../pages/HomeTecnico/TelaPerfilTecnico'

//Páginas comuns a todos
import DetalhesTanque from '../pages/DetalhesTanque'
import TelaConfiguracao from '../pages/TelaConfiguracao'

const AppTab = createBottomTabNavigator()

const Technician = () => {
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

            <AppTab.Screen name='Home' component={HomeTecnico}
                options={{
                    tabBarLabel: 'Início',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={30} />
                    ),
                }}
            />
            <AppTab.Screen name='Produtores' component={TelaProdutores}
                options={{
                    tabBarLabel: 'Produtores',
                    tabBarIcon: ({ }) => (
                        <Icon name="account-cowboy-hat" color={'#2a9d8f'} size={30} />
                    ),
                }}
            />
            <AppTab.Screen name='Laticínios' component={TelaLaticinios}
                options={{
                    tabBarLabel: 'Laticínios',
                    tabBarIcon: ({ }) => (
                        <Icon name="account-tie" color={'#da1e37'} size={33} />
                    ),
                }}

            />
            <AppTab.Screen name='Responsáveis' component={TelaResponsaveis}
                options={{
                    tabBarLabel: 'Responsáveis',
                    tabBarIcon: ({ }) => (
                        <Icon name="account-hard-hat" color={'#fca311'} size={33} />
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
            <AppTab.Screen name='Perfil' component={TelaPerfilTecnico}
                options={{
                    tabBarButton: () => null,
                }}
            />
        </AppTab.Navigator>
    )
}

export default Technician
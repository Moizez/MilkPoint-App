import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { AuthContext } from '../contexts/auth'

//Páginas TAB do Produtor
import HomeProdutor from '../pages/HomeProdutor'
import TelaHistoricoProdutor from '../pages/HomeProdutor/TelaHistoricoProdutor'
import TelaDepositosPendentesProdutor from '../pages/HomeProdutor/TelaDepositosPendentesProdutor'
import TelaConfiguracaoProdutor from '../pages/HomeProdutor/TelaConfiguracaoProdutor'
import TelaPerfilProdutor from '../pages/HomeProdutor/TelaPerfilProdutor'
import DetalhesTanque from '../pages/DetalhesTanque'

//Páginas TAB do Laticínio
import HomeLaticinio from '../pages/HomeLaticinio'
import TelaHistoricoLaticinio from '../pages/HomeLaticinio/TelaHistoricoLaticinio'
import TelaRetiradasPendentesLaticinio from '../pages/HomeLaticinio/TelaRetiradasPendentesLaticinio'
import TelaConfiguracaoLaticinio from '../pages/HomeLaticinio/TelaConfiguracaoLaticinio'
import TelaPerfilLaticinio from '../pages/HomeLaticinio/TelaPerfilLaticinio'

//Páginas TAB do Responsável
import HomeResponsavel from '../pages/HomeResponsavel'
import TelaDepositosPendentesResponsavel from '../pages/HomeResponsavel/TelaDepositosPendentesResponsavel'
import TelaRetiradasPendentesResponsavel from '../pages/HomeResponsavel/TelaRetiradasPendentesResponsavel'
import TelaHistoricoResponsavel from '../pages/HomeResponsavel/TelaHistoricoResponsavel'
import TelaConfiguracaoResponsavel from '../pages/HomeResponsavel/TelaConfiguracaoResponsavel'
import TelaPerfilResponsavel from '../pages/HomeResponsavel/TelaPerfilResponsavel'

//Páginas TAB do Técnico
import HomeTecnico from '../pages/HomeTecnico'

const AppTab = createBottomTabNavigator()

function ResponsavelTab() {
    return (
        <AppTab.Navigator
            initialRouteName='Home'
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
            <AppTab.Screen name='Mais' component={TelaConfiguracaoResponsavel}
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

function ProdutorTab() {
    return (
        <AppTab.Navigator
            initialRouteName='Home'
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
                }} Depósitos Pendentes
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
            <AppTab.Screen name='Mais' component={TelaConfiguracaoProdutor}
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

function LaticinioTab() {
    return (
        <AppTab.Navigator
            initialRouteName='Home'
            tabBarOptions={{
                activeTintColor: '#FFF',
                inactiveTintColor: '#000',
                tabBarPosition: 'bottom',
                animationEnabled: true,
                swipeEnabled: true,
                activeBackgroundColor: '#292b2c',
                inactiveBackgroundColor: '#FFF'
            }}>

            <AppTab.Screen name='Home' component={HomeLaticinio}
                options={{
                    tabBarLabel: 'Início',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={30} />
                    ),
                }} Depósitos Pendentes

            />
            <AppTab.Screen name='Retiradas' component={TelaRetiradasPendentesLaticinio}
                options={{
                    tabBarLabel: 'Retiradas',
                    tabBarIcon: ({ }) => (
                        <Icon name="basket-unfill" color={'#da1e37'} size={30} />
                    ),
                }}
            />
            <AppTab.Screen name='Histórico' component={TelaHistoricoLaticinio}
                options={{
                    tabBarLabel: 'Histórico',
                    tabBarIcon: ({ }) => (
                        <Icon name="archive" color={'#fca311'} size={30} />
                    ),
                }}
            />
            <AppTab.Screen name='Mais' component={TelaConfiguracaoLaticinio}
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
            <AppTab.Screen name='Perfil' component={TelaPerfilLaticinio}
                options={{
                    tabBarButton: () => null,
                }}
            />
        </AppTab.Navigator>
    )
}

function TecnicoTab() {
    return (
        <AppTab.Navigator
            initialRouteName='Home'
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
                }} Depósitos Pendentes
            />
        </AppTab.Navigator>
    )
}

export default function AppRoutes() {

    const { user } = useContext(AuthContext)

    if (user.perfil === 1) {
        return ProdutorTab()
    } else if (user.perfil === 2) {
        return ResponsavelTab()
    } else if (user.perfil === 3) {
        return LaticinioTab()
    } else {
        return TecnicoTab()
    }
}

import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { AuthContext } from '../contexts/auth'
import { DrawerContent } from '../components/DrawerContent'

//Páginas do Drawer do Produtor
import HomeProdutor from '../pages/HomeProdutor'
import TelaHistoricoProdutor from '../pages/HomeProdutor/TelaHistoricoProdutor'
import TelaPerfilProdutor from '../pages/HomeProdutor/TelaPerfilProdutor'
import TelaConfiguracaoProdutor from '../pages/HomeProdutor/TelaConfiguracaoProdutor'

//Páginas do Drawer do Latcínio
import HomeLaticinio from '../pages/HomeLaticinio'
import TelaHistoricoLaticinio from '../pages/HomeLaticinio/TelaHistoricoLaticinio'
import TelaPerfilLaticinio from '../pages/HomeLaticinio/TelaPerfilLaticinio'
import TelaConfiguracaoLaticinio from '../pages/HomeLaticinio/TelaConfiguracaoLaticinio'

//Páginas do Drawer do Responsável
import HomeResponsavel from '../pages/HomeResponsavel'
import TelaHistoricoResponsavel from '../pages/HomeResponsavel/TelaHistoricoResponsavel'
import TelaPerfilResponsavel from '../pages/HomeResponsavel/TelaPerfilResponsavel'
import TelaConfiguracaoResponsavel from '../pages/HomeResponsavel/TelaConfiguracaoResponsavel'

//Páginas TAB do Responsável
import TelaDepositosPendentesResponsavel from '../pages/HomeResponsavel/TelaDepositosPendentesResponsavel'
import TelaRetiradasPendentesResponsavel from '../pages/HomeResponsavel/TelaRetiradasPendentesResponsavel'

//Páginas TAB do Produtor
import TelaDepositosPendentesProdutor from '../pages/HomeProdutor/TelaDepositosPendentesProdutor'

//Páginas TAB do Laticínio
import TelaRetiradasPendentesLaticinio from '../pages/HomeLaticinio/TelaRetiradasPendentesLaticinio'

const AppDrawer = createDrawerNavigator()
const AppTab = createBottomTabNavigator()

function ResponsavelTab() {
    return (
        <AppTab.Navigator
            tabBarOptions={{
                activeTintColor: '#FFF',
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
                }}/>

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
        </AppTab.Navigator>
    )
}

function ProdutorTab() {
    return (
        <AppTab.Navigator
            tabBarOptions={{
                activeTintColor: '#FFF',
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
                    tabBarLabel: 'Depósitos Pendentes',
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
        </AppTab.Navigator>
    )
}

function LaticinioTab() {
    return (
        <AppTab.Navigator
            tabBarOptions={{
                activeTintColor: '#FFF',
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
                    tabBarLabel: 'Retiradas Pendentes',
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
        </AppTab.Navigator>
    )
}

function LaticinioDrawer() {
    return (
        <AppDrawer.Navigator drawerContent={props => <DrawerContent {...props} />}
            drawerType='front'
        >
            <AppDrawer.Screen name='Home' component={LaticinioTab} />
            <AppDrawer.Screen name='Histórico' component={TelaHistoricoLaticinio} />
            <AppDrawer.Screen name='Perfil' component={TelaPerfilLaticinio} />
            <AppDrawer.Screen name='Configurações' component={TelaConfiguracaoLaticinio} />
        </AppDrawer.Navigator>
    )
}

function ResponsavelDrawer() {
    return (
        <AppDrawer.Navigator drawerContent={props => <DrawerContent {...props} />}
            drawerType='front'
        >
            <AppDrawer.Screen name='Home' component={ResponsavelTab} />
            <AppDrawer.Screen name='Histórico' component={TelaHistoricoResponsavel} />
            <AppDrawer.Screen name='Perfil' component={TelaPerfilResponsavel} />
            <AppDrawer.Screen name='Configurações' component={TelaConfiguracaoResponsavel} />
        </AppDrawer.Navigator>
    )
}

export default function AppRoutes() {
    const { user } = useContext(AuthContext)

    if (user.perfil === 2) {
        return ResponsavelDrawer()
    } else if (user.perfil === 3) {
        return LaticinioDrawer()
    } else if (user.perfil === 1) {

        return (
            <AppDrawer.Navigator drawerContent={props => <DrawerContent {...props} />}
                drawerType='front'
            >
                <AppDrawer.Screen name='Home' component={ProdutorTab} />
                <AppDrawer.Screen name='Histórico' component={TelaHistoricoProdutor} />
                <AppDrawer.Screen name='Perfil' component={TelaPerfilProdutor} />
                <AppDrawer.Screen name='Configurações' component={TelaConfiguracaoProdutor} />
            </AppDrawer.Navigator>

        )
    } else {
        alert("Seu e-mail ou senha são inválidos!")
    }
}
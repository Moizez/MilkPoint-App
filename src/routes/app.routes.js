import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { AuthContext } from '../contexts/auth'
import { DrawerContent } from '../components/DrawerContent'

//Páginas do Produtor
import HomeProdutor from '../pages/HomeProdutor'
import RelatorioProdutor from '../pages/HomeProdutor/RelatorioProdutor'
import PerfilProdutor from '../pages/HomeProdutor/PerfilProdutor'
import ConfigProdutor from '../pages/HomeProdutor/ConfigProdutor'

//Páginas do Latcínio
import HomeLaticinio from '../pages/HomeLaticinio'
import RelatorioLaticinio from '../pages/HomeLaticinio/RelatorioLaticinio'
import PerfilLaticinio from '../pages/HomeLaticinio/PerfilLaticinio'
import ConfigLaticinio from '../pages/HomeLaticinio/ConfigLaticinio'

//Páginas do Responsável
import HomeResponsavel from '../pages/HomeResponsavel'
import RelatorioResponsavel from '../pages/HomeResponsavel/RelatorioResponsavel'
import PerfilResponsavel from '../pages/HomeResponsavel/PerfilResponsavel'
import ConfigResponsavel from '../pages/HomeResponsavel/ConfigResponsavel'

//Páginas TAB do Responsável
import DepositosPendentes from '../pages/HomeResponsavel/DepositosPendentes'
import RetiradasPendentes from '../pages/HomeResponsavel/RetiradasPendentes'

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
                }} Depósitos Pendentes

            />
            <AppTab.Screen name='Depositos' component={DepositosPendentes}
                options={{
                    tabBarLabel: 'Depósitos Pendentes',
                    tabBarIcon: ({ }) => (
                        <Icon name="arrow-up-bold-hexagon-outline" color={'#2a9d8f'} size={30} />
                    ),
                }}
            />
            <AppTab.Screen name='Retiradas' component={RetiradasPendentes}
                options={{
                    tabBarLabel: 'Retiradas Pendentes',
                    tabBarIcon: ({ }) => (
                        <Icon name="arrow-down-bold-hexagon-outline" color={'#da1e37'} size={30} />
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
            <AppDrawer.Screen name='Home' component={HomeLaticinio} />
            <AppDrawer.Screen name='Relatorio' component={RelatorioLaticinio} />
            <AppDrawer.Screen name='Perfil' component={PerfilLaticinio} />
            <AppDrawer.Screen name='Configurações' component={ConfigLaticinio} />
        </AppDrawer.Navigator>
    )
}

function ResponsavelDrawer() {
    return (
        <AppDrawer.Navigator drawerContent={props => <DrawerContent {...props} />}
            drawerType='front'
        >
            <AppDrawer.Screen name='Home' component={ResponsavelTab} />
            <AppDrawer.Screen name='Relatorio' component={RelatorioResponsavel} />
            <AppDrawer.Screen name='Perfil' component={PerfilResponsavel} />
            <AppDrawer.Screen name='Configurações' component={ConfigResponsavel} />
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
                <AppDrawer.Screen name='Home' component={HomeProdutor} />
                <AppDrawer.Screen name='Relatorio' component={RelatorioProdutor} />
                <AppDrawer.Screen name='Perfil' component={PerfilProdutor} />
                <AppDrawer.Screen name='Configurações' component={ConfigProdutor} />
            </AppDrawer.Navigator>

        )
    } else {
        alert("Seu e-mail ou senha são inválidos!")
    }
}
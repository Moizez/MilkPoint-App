import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Avatar, Title, Caption, Drawer } from 'react-native-paper'

import { AuthContext } from '../../contexts/auth'

export function DrawerContent(props) {

    const { user, logOut } = useContext(AuthContext)

    //Produtor
    if (user.perfil === 1) {

        return (
            <View style={{ flex: 1 }}>
                <DrawerContentScrollView {...props}>
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                                <Avatar.Image
                                    source={require('../../assets/user.png')}
                                    size={60}
                                />
                                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                    <Title style={styles.title}>{user.nome}</Title>
                                    <Caption style={styles.caption}>{user.email}</Caption>
                                </View>
                            </View>
                        </View>

                        <Drawer.Section>
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name='home'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label='Início'
                                onPress={() => { props.navigation.navigate('Home') }}
                            />

                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name='archive'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label='Histórico'
                                onPress={() => { props.navigation.navigate('Histórico') }}
                            />

                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name='account'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label='Perfil'
                                onPress={() => { props.navigation.navigate('Perfil') }}
                            />

                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name='settings'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label='Configurações'
                                onPress={() => { props.navigation.navigate('Configurações') }}
                            />
                        </Drawer.Section>

                    </View>
                </DrawerContentScrollView>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ size }) => (
                            <Icon
                                name='exit-to-app'
                                color={'red'}
                                size={size}
                            />
                        )}
                        label='Sair'
                        onPress={() => logOut()}
                    />

                </Drawer.Section>
            </View>
        );

    }

    //Responsável
    if (user.perfil === 2) {

        return (
            <View style={{ flex: 1 }}>
                <DrawerContentScrollView {...props}>
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                                <Avatar.Image
                                    source={require('../../assets/user.png')}
                                    size={60}
                                />
                                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                    <Title style={styles.title}>{user.nome}</Title>
                                    <Caption style={styles.caption}>{user.email}</Caption>
                                </View>
                            </View>
                        </View>

                        <Drawer.Section>
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name='home'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label='Início'
                                onPress={() => { props.navigation.navigate('Home') }}
                            />

                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name='archive'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label='Histórico'
                                onPress={() => { props.navigation.navigate('Histórico') }}
                            />

                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name='account'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label='Perfil'
                                onPress={() => { props.navigation.navigate('Perfil') }}
                            />

                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name='settings'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label='Configurações'
                                onPress={() => { props.navigation.navigate('Configurações') }}
                            />
                        </Drawer.Section>

                    </View>
                </DrawerContentScrollView>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ size }) => (
                            <Icon
                                name='exit-to-app'
                                color={'red'}
                                size={size}
                            />
                        )}
                        label='Sair'
                        onPress={() => logOut()}
                    />

                </Drawer.Section>
            </View>
        );
    }

    //Laticínio
    else {
        return (
            <View style={{ flex: 1 }}>
                <DrawerContentScrollView {...props}>
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                                <Avatar.Image
                                    source={require('../../assets/user.png')}
                                    size={60}
                                />
                                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                    <Title style={styles.title}>{user.nome}</Title>
                                    <Caption style={styles.caption}>{user.email}</Caption>
                                </View>
                            </View>
                        </View>

                        <Drawer.Section>
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name='home'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label='Início'
                                onPress={() => { props.navigation.navigate('Home') }}
                            />

                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name='archive'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label='Histórico'
                                onPress={() => { props.navigation.navigate('Histórico') }}
                            />

                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name='account'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label='Perfil'
                                onPress={() => { props.navigation.navigate('Perfil') }}
                            />

                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name='settings'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label='Configurações'
                                onPress={() => { props.navigation.navigate('Configurações') }}
                            />
                        </Drawer.Section>

                    </View>
                </DrawerContentScrollView>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ size }) => (
                            <Icon
                                name='exit-to-app'
                                color={'red'}
                                size={size}
                            />
                        )}
                        label='Sair'
                        onPress={() => logOut()}
                    />

                </Drawer.Section>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 17,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
})
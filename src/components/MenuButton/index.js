import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'

import { Container, Menu } from './styles'


export default function MenuButton() {

    const navigation = useNavigation()

    return (
        <Container>
            <Menu onPress={() => navigation.toggleDrawer()} >
                <Icon name='md-menu' color='#FFF' size={40} />
            </Menu>
        </Container>
    );
}
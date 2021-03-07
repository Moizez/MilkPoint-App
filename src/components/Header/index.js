import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Api from '../../services/api'

import {
    Container, Cover, Avatar, UserRole, AvatarBox, Profile, InfoBox, UserName, UserEmail,
    InfoButton, TitleBox, TitleListBox, TitleList, TitleButton
} from './styles'

const Header = ({ msg, onOpen, calendar, disabled, showNameList }) => {

    const navigation = useNavigation()
    const [user, setUser] = useState([])

    useEffect(() => {
        const loadUser = async () => {
            const user = await Api.getUser()
            setUser(user)
        }

        loadUser()
    }, [user])

    const perfilCover = () => {
        if (user.perfil == 1) {
            return require('../../assets/images/cover.png')
        } else if (user.perfil == 2) {
            return require('../../assets/images/cover2.png')
        } else if (user.perfil == 3) {
            return require('../../assets/images/cover3.png')
        } else if (user.perfil == 4) {
            return require('../../assets/images/cover4.png')
        } else return
    }

    return (
        <>
            <Container
                source={perfilCover()}
                resizeMode='cover'
            >
                <Cover>
                    <AvatarBox>
                        <Avatar onPress={() => navigation.navigate('ProfileDetails')}>
                            <Profile
                                source={require('../../assets/images/avatar.jpg')}
                                imageStyle={{ borderRadius: 15 }}>
                                <Icon name='information' color='#292b2c' size={18} />
                            </Profile>
                        </Avatar>
                        <UserRole>
                            {user.perfil == 1 && ('Produtor')}
                            {user.perfil == 2 && ('Responsável')}
                            {user.perfil == 3 && ('Laticínio')}
                            {user.perfil == 4 && ('Técnico')}
                        </UserRole>
                    </AvatarBox>
                    <InfoBox>
                        <UserName>Olá, {user.perfil == 3 ? user.apelido : user.nome}</UserName>
                        <UserEmail>{user.email}</UserEmail>
                    </InfoBox>
                    <InfoButton onPress={() => navigation.navigate('AppTips')}>
                        <Icon name='information' color='#FFF' size={22} />
                    </InfoButton>
                </Cover>
            </Container>

            {!showNameList &&
                <TitleBox>
                    <TitleListBox>
                        <TitleList>{msg}</TitleList>
                    </TitleListBox>
                    <TitleButton onPress={onOpen} disabled={disabled}>
                        {calendar}
                    </TitleButton>
                </TitleBox>
            }
        </>
    );
}

export default Header

import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/auth'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    Container, Cover, Avatar, UserRole, AvatarBox, Profile, InfoBox, UserName, UserEmail,
    InfoButton, TitleBox, TitleListBox, TitleList, TitleButton
} from './styles'

const Header = ({ msg, onOpen, calendar, disabled, showNameList }) => {

    const perfilCover = () => {
        if (user.perfil == 1) {
            return require('../../assets/images/cover.png')
        } else if (user.perfil == 2) {
            return require('../../assets/images/cover2.png')
        } else if (user.perfil == 3) {
            return require('../../assets/images/cover3.png')
        } else {
            return require('../../assets/images/cover4.png')
        }
    }

    const navigation = useNavigation()
    const { user } = useContext(AuthContext)

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
                        <UserName>Olá, {user.perfil == 3 ? user.nomeFantasia : user.nome}</UserName>
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

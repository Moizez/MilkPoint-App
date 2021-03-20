import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'

import Api from '../../../services/api'
import Loader from '../../../components/Loader'
import EditProfileModal from '../../../components/Modals/EditProfileModal'

import {
    Container, HeaderBox, Cover, ProfileBox, Profile, EditPhoto, ProfileInformation,
    Title, BoldText, CardInfo, Text, EditBox, EditButton, TextButton, DividerH,
    CloseButton, Modal
} from './styles'

const ProfileDetails = () => {

    const navigation = useNavigation()
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(false)
    const [editModal, setEditModal] = useState(false)

    let birth = moment(user.dataNascimento).locale('pt-br').format('L')
    const openEditModal = () => setEditModal(true)
    const closeEditModal = () => setEditModal(false)

    const loadUser = async () => {
        setLoading(true)
        const response = await Api.getUser()
        setUser(response)
        setLoading(false)
    }

    useEffect(() => {
        loadUser()
    }, [])

    const setProfileCover = () => {
        if (user.perfil == 1) {
            return require('../../../assets/images/cover.png')
        } else if (user.perfil == 2) {
            return require('../../../assets/images/cover2.png')
        } else if (user.perfil == 3) {
            return require('../../../assets/images/cover3.png')
        } else if (user.perfil == 4) {
            return require('../../../assets/images/cover4.png')
        } else return
    }

    return (
        <Container>
            <HeaderBox>
                <Cover
                    source={setProfileCover()}
                    resizeMode='cover'
                >
                    <ProfileBox>
                        <Profile
                            imageStyle={{ borderRadius: 20 }}
                            source={require('../../../assets/images/avatar.jpg')}
                        >
                            <EditPhoto>
                                <Icon name='camera' color='#FFF' size={16} />
                            </EditPhoto>
                        </Profile>
                    </ProfileBox>
                </Cover>
            </HeaderBox>

            <ProfileInformation>
                <Title>Dados Cadastrais</Title>
                <DividerH />

                <CardInfo>
                    <BoldText>Nome: <Text>{user.nome}</Text></BoldText>
                    <BoldText>{user.perfil === 3 ? 'Empresa: ' : 'Aelido: '}<Text>{user.apelido}</Text></BoldText>
                    <BoldText>E-mail: <Text>{user.email}</Text></BoldText>
                    {user.perfil === 3 ?
                        <BoldText>CNPJ: <Text>{user.cnpj}</Text></BoldText> :
                        <BoldText>CPF: <Text>{user.cpf}</Text></BoldText>
                    }
                    <BoldText>Nascimento: <Text>{birth}</Text></BoldText>
                </CardInfo>

                <Title>Endereço</Title>
                <DividerH />

                <CardInfo>
                    <BoldText>Estado: <Text>{user.uf}</Text></BoldText>
                    <BoldText>Cidade: <Text>{user.localidade}</Text></BoldText>
                    <BoldText>CEP: <Text>{user.cep}</Text></BoldText>
                    <BoldText>Bairro: <Text>{user.bairro}</Text></BoldText>
                    <BoldText>Rua: <Text>{user.logradouro}</Text></BoldText>
                    <BoldText>Complemento: <Text>{user.complemento}</Text></BoldText>
                </CardInfo>

            </ProfileInformation>

            <EditBox>
                <EditButton onPress={openEditModal}>
                    <TextButton>Editar Dados</TextButton>
                    <Icon name='account-edit' color='#FFF' size={35} style={{ marginLeft: 20 }} />
                </EditButton>
            </EditBox>
            {loading && <Loader />}

            <Modal
                animationType='slide'
                visible={editModal}
                transparent={false}
            >
                <EditProfileModal
                    user={user}
                    loadUser={loadUser}
                    closeModal={closeEditModal}
                />
            </Modal>

            <CloseButton onPress={() => navigation.goBack()}>
                <Icon name='chevron-down' color='#FFF' size={24} />
            </CloseButton>

        </Container>
    );
}

export default ProfileDetails
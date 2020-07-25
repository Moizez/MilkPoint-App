import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/auth'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Modal, StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native'

import ModalInfo from '../../components/ModalInfo'

export default function Header({ nameList, onOpen, calendar }) {

    const perfilCover = () => {
        if (user.perfil == 1) {
            return require('../../assets/images/cover.png')
        } else if (user.perfil == 2) {
            return require('../../assets/images/cover2.png')
        } else {
            return require('../../assets/images/cover3.png')
        }
    }

    const navigation = useNavigation()

    const { user } = useContext(AuthContext)
    const [isVisible, setVisible] = useState(false)

    const closeModal = () => { setVisible(false) }

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.containerPerfil}
                imageStyle={{ borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }}
                source={perfilCover()}
                resizeMode='cover'
            >
                <View style={styles.containerImage}>
                    <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                        <ImageBackground
                            imageStyle={{ borderRadius: 20 }}
                            style={styles.image}
                            source={require('../../assets/images/avatar.jpg')}
                        >
                            <Icon name='information' color='#292b2c' size={18} style={styles.editPhoto} />
                        </ImageBackground>
                    </TouchableOpacity>
                    <Text style={styles.tituloPerfil}>
                        {user.perfil == 1 && ('Produtor')}
                        {user.perfil == 2 && ('Responsável')}
                        {user.perfil == 3 && ('Laticínio')}
                    </Text>
                </View>
                <View style={styles.containerNome}>
                    <Text style={styles.nome}>Olá, {user.perfil == 3 ? user.nomeFantasia : user.apelido}</Text>
                    <Text style={{ color: '#FFF', fontStyle: 'normal' }}>{user.email}</Text>
                </View>
                <View style={styles.containinerInfo}>
                    <TouchableOpacity onPress={() => setVisible(!isVisible)}>
                        <Icon name='information' color='#FFF' size={22} />
                    </TouchableOpacity>
                </View>

            </ImageBackground>

            <View style={styles.containerNameList}>
                <View>
                    <Text style={styles.tituloBody}>{nameList}</Text>
                </View>
                <TouchableOpacity onPress={onOpen}>
                    {calendar}
                </TouchableOpacity>
            </View>

            <Modal
                animationType='slide'
                transparent={true}
                visible={isVisible}
            >
                <ModalInfo onClose={closeModal} />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
    },
    containerPerfil: {
        flex: 1,
        flexDirection: 'row',
        padding: 6,
    },
    containerImage: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6,
    },
    containerNome: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 20,
    },
    containinerInfo: {
        flex: 0.1,
    },
    containerNameList: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        backgroundColor: '#292b2c',
        marginHorizontal: 12,
        marginBottom: 3,
    },
    tituloBody: {
        color: '#FFF'
    },
    image: {
        width: 80,
        height: 80,
        alignItems: 'flex-end',
    },
    tituloPerfil: {
        color: '#FFF',
        fontStyle: 'italic',
        fontSize: 13
    },
    nome: {
        fontFamily: 'Lato',
        fontSize: 25,
        color: '#FFF'
    },
    editPhoto: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4
    }
})

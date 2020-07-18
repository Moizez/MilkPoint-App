import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/auth'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Modal, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'

import ModalInfo from '../../components/ModalInfo'

export default function Header({ nameList, onOpen, calendar }) {

    const navigation = useNavigation()

    const { user } = useContext(AuthContext)
    const [isVisible, setVisible] = useState(false)

    const closeModal = () => { setVisible(false) }

    return (
        <View style={styles.container}>
            <View style={styles.containerPerfil}>
                <View style={styles.containerImage} >
                    <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                        <Image
                            style={styles.image}
                            source={require('../../assets/images/avatar.jpg')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.tituloPerfil}>
                        {user.perfil == 1 && ('Produtor')}
                        {user.perfil == 2 && ('Responsável')}
                        {user.perfil != 1 && user.perfil != 2 && ('Laticínio')}
                    </Text>
                </View>
                <View style={styles.containerNome}>
                    <Text style={styles.nome}>Olá, {user.perfil == 3 ? user.nomeFantasia : user.apelido}</Text>
                    <Text style={{ color: '#000', fontStyle: 'normal' }}>{user.email}</Text>
                </View>
                <View style={styles.containinerInfo}>
                    <TouchableOpacity onPress={() => setVisible(!isVisible)}>
                        <Icon name='information' color='#000' size={22} />
                    </TouchableOpacity>
                </View>

            </View>

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
        flex: 0.4,
    },
    containerPerfil: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#faf9f9',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
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
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    containinerInfo: {
        flex: 0.1,
    },
    containerNameList: {
        flex: 0.3,
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
        borderRadius: 20
    },
    tituloPerfil: {
        color: '#da1e37',
        fontStyle: 'italic',
        fontSize: 13
    },
    nome: {
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: 23,
        color: '#000'
    },
})

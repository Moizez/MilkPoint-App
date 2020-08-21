import React, { useContext } from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'

import { AuthContext } from '../../../contexts/auth'

export default function TelaPerfilProdutor() {

    const { user } = useContext(AuthContext)
    let nascimento = moment(user.dataNascimento).locale('pt-br').format('L')

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.containerPerfil}
                source={require('../../../assets/images/cover.png')}
                resizeMode='cover'
            >
                <View style={styles.containerImage}>
                    <ImageBackground
                        style={styles.image}
                        imageStyle={{ borderRadius: 20 }}
                        source={require('../../../assets/images/avatar.jpg')}
                    >
                        <TouchableOpacity style={styles.editPhoto}>
                            <Icon name='camera' color='#FFF' size={18} />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </ImageBackground>
            <View style={styles.containerTitulo}>
                <Text style={styles.titulo}>Minha Conta</Text>
            </View>
            <ScrollView style={styles.containerCard}>
                <View style={styles.cardItem}>
                    <Text style={styles.tituloItem}>DADOS CADASTRAIS</Text>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 5 }}></View>
                    <Text style={styles.textItem}>Nome completo: <Text style={styles.text}>{user.nome}</Text></Text>
                    <Text style={styles.textItem}>Apelido: <Text style={styles.text}>{user.apelido}</Text></Text>
                    <Text style={styles.textItem}>E-mail: <Text style={styles.text}>{user.email}</Text></Text>
                    <Text style={styles.textItem}>CPF: <Text style={styles.text}>{user.cpf}</Text></Text>
                    <Text style={styles.textItem}>Data de nascimento: <Text style={styles.text}>{nascimento}</Text></Text>
                </View>
                <View style={styles.cardItem}>
                    <Text style={styles.tituloItem}>ENDEREÇO</Text>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 5 }}></View>
                    <Text style={styles.textItem}>Estado: <Text style={styles.text}>{user.uf}</Text></Text>
                    <Text style={styles.textItem}>Cidade: <Text style={styles.text}>{user.localidade}</Text></Text>
                    <Text style={styles.textItem}>CEP: <Text style={styles.text}>{user.cep}</Text></Text>
                    <Text style={styles.textItem}>Bairro: <Text style={styles.text}>{user.bairro}</Text></Text>
                    <Text style={styles.textItem}>Rua/Comunidade: <Text style={styles.text}>{user.logradouro}</Text></Text>
                    <Text style={styles.textItem}>Complemento: <Text style={styles.text}>{user.complemento}</Text></Text>
                </View>
                <View style={styles.ContainerButtons}>
                    <TouchableOpacity style={styles.buttons}>
                        <Text style={styles.textButton}>Editar Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        <Text style={styles.textButton}>Alterar Senha</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10
    },
    containerPerfil: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerTitulo: {
        height: 45,
        backgroundColor: '#292b2c',
        justifyContent: 'center'
    },
    containerCard: {
        flex: 1,
        marginHorizontal: 12,
        padding: 8
    },
    containerImage: {
        marginRight: 6,
    },
    image: {
        width: 80,
        height: 80,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    tituloPerfil: {
        color: '#FFF',
        fontStyle: 'italic',
        fontSize: 13
    },
    editPhoto: {
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        width: 22,
        height: 22,
        borderWidth: 1,
        borderRadius: 12,
        margin: 4
    },
    titulo: {
        fontSize: 20,
        textAlign: 'center',
        color: '#FFF'
    },
    tituloItem: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    textItem: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 16,
        fontWeight: 'normal'

    },
    cardItem: {
        flex: 1,
        marginVertical: 15,
    },
    ContainerButtons: {
        flex: 0.25,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    buttons: {
        backgroundColor: '#292b2c',
        justifyContent: 'center',
        width: '40%',
        height: 45,
        borderRadius: 5

    },
    textButton: {
        textAlign: 'center',
        fontSize: 15,
        color: '#FFF'
    }
})
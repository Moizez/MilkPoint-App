import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import moment from 'moment'
import 'moment/locale/pt-br'

import { AuthContext } from '../../contexts/auth'

const CardInfo = ({ dataInfo, showModal, titlePerfil, infoPerfil }) => {

    let dayHour = moment(dataInfo.dataNow).locale('pt-br').format('L [às] LT[h]')

    const { user } = useContext(AuthContext)

    const bucketColor = (status) => {
        if (dataInfo.confirmacao == true) {
            return status = 'Confirmado'
        } if (dataInfo.excluido == true) {
            return status = 'Cancelado'
        } else {
            return status = 'Pendente'
        }
    }
    let status = bucketColor()

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <View style={styles.infoCard}>
                    <Text style={styles.textInfo}>Tanque: <Text style={styles.text}>{dataInfo.tanque.nome}</Text></Text>
                    <Text style={styles.textInfo}>Tipo do leite: <Text style={styles.text}>{dataInfo.tanque.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</Text></Text>
                    <Text style={styles.textInfo}>Responsável: <Text style={styles.text}>{dataInfo.tanque.responsavel.nome}</Text></Text>
                    <Text style={styles.textInfo}>Valor solicitado: <Text style={styles.text}>{dataInfo.quantidade} litros</Text></Text>
                    {user.perfil == 2 && <Text style={styles.textInfo}>{titlePerfil} <Text style={styles.text}>{infoPerfil}</Text></Text>}
                    <Text style={styles.textInfo}>Data: <Text style={styles.text}>{dayHour}</Text></Text>
                </View>

                <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd' }}></View>

                <TouchableOpacity style={styles.buttonCard} onPress={showModal}>
                    {status == 'Confirmado' && (<Icon name='bucket' size={50} color='#2a9d8f' />)}
                    {status == 'Cancelado' && (<Icon name='bucket' size={50} color='#da1e37' />)}
                    {status != 'Cancelado' && status != 'Confirmado' && (<Icon name='bucket' size={50} color='#6c757d' />)}
                    <Text style={{ marginTop: 5 }}>Pendente</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ececec',
        margin: 12,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 5
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    infoCard: {
        backgroundColor: '#faf9f9',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 2,
        padding: 6,

    },
    buttonCard: {
        flex: 0.6,
        margin: 3,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 5
    },
    textInfo: {
        fontWeight: 'bold',
        fontSize: 14.5,
    },
    text: {
        fontWeight: 'normal'
    }
})

export default CardInfo
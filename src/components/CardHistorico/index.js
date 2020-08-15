import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import moment from 'moment'
import 'moment/locale/pt-br'

import { AuthContext } from '../../contexts/auth'

const CardHistorico = ({ data, showModal }) => {

    let dayHour = moment(data.dataNow).locale('pt-br').format('L [às] LT[h]')
    const { user } = useContext(AuthContext)

    const bucketColor = (status) => {
        if (data.confirmacao == true) {
            return status = 'Confirmado'
        } if (data.excluido == true) {
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
                    <Text style={styles.textInfo}>Tanque: <Text style={styles.text}>{data.tanque.nome}</Text></Text>
                    <Text style={styles.textInfo}>Tipo do leite: <Text style={styles.text}>{data.tanque.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</Text></Text>
                    {user.perfil === 2 && <Text style={styles.textInfo}>Solicitante: <Text style={styles.text}>{data.produtor?.nome || data.laticinio?.nomeFantasia}</Text></Text>}
                    <Text style={styles.textInfo}>Valor solicitado: <Text style={styles.text}>{data.quantidade} litros</Text></Text>
                    <Text style={styles.textInfo}>Data: <Text style={styles.text}>{dayHour}</Text></Text>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 8 }}></View>
                    {data.excluido === true ? <Text style={styles.textInfo}>Cancelado por: <Text style={styles.text}>{data.efetuou}</Text></Text>
                        : <Text style={styles.textInfo}>Responsável: <Text style={styles.text}>{data.tanque.responsavel.nome}</Text></Text>}
                    {data.observacao !== '' && <Text style={styles.textInfo}>Motivo: <Text style={styles.text}>{data.observacao}</Text></Text>}
                </View>

                <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd' }}></View>

                <View style={styles.buttonCard} onPress={showModal}>
                    {status == 'Confirmado' && (<Icon name='bucket' size={50} color='#2a9d8f' />)}
                    {status == 'Cancelado' && (<Icon name='bucket' size={50} color='#da1e37' />)}
                    {status != 'Cancelado' && status != 'Confirmado' && (<Icon name='bucket' size={50} color='#6c757d' />)}
                    <Text style={{ marginTop: 5 }}>{status}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf9f9',
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
        flex: 0.7,
        margin: 3,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        shadowColor: 'rgba(0,0,0,0.7)',
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

export default CardHistorico
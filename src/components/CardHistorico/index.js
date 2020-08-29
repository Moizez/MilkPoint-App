import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import moment from 'moment'
import 'moment/locale/pt-br'

import { AuthContext } from '../../contexts/auth'
import { numberToReal } from '../Helpers'

const CardHistorico = ({ data }) => {

    let dayHour = moment(data.dataNow).locale('pt-br').format('L [às] LT[h]')
    const { user } = useContext(AuthContext)
    const [isExpand, setExpand] = useState(false)

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
    let result = numberToReal(data.valor)
    let size = 30

    const renderInfo = () => {
        return (
            <View style={styles.infoCard}>
                <Text style={styles.textInfo}>Tipo do leite: <Text style={styles.text}>{data.tanque.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</Text></Text>
                <Text style={styles.textInfo}>Valor: <Text style={styles.text}>{result}</Text></Text>
                {data.excluido === true ? <Text style={styles.textInfo}>Cancelado por: <Text style={styles.text}>{data.efetuou}</Text></Text>
                    : <Text style={styles.textInfo}>Responsável: <Text style={styles.text}>{data.tanque.responsavel.nome}</Text></Text>}
                {data.observacao !== '' && <Text style={styles.textInfo}>Motivo: <Text style={styles.text}>{data.observacao}</Text></Text>}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <View style={styles.infoCard}>
                    {user.perfil != 2 && <Text style={styles.textInfo}>Tanque: <Text style={styles.text}>{data.tanque.nome}</Text></Text>}
                    {user.perfil === 2 && <Text style={styles.textInfo}>Solicitante: <Text style={styles.text}>{data.produtor?.nome || data.laticinio?.nomeFantasia}</Text></Text>}
                    <Text style={styles.textInfo}>Qtd. solicitada: <Text style={styles.text}>{data.quantidade.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} litros</Text></Text>
                    <Text style={styles.textInfo}>Data: <Text style={styles.text}>{dayHour}</Text></Text>
                </View>

                <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd' }}></View>

                <View style={styles.buttonCard}>
                    {status == 'Confirmado' && (<Icon name='bucket' size={size} color='#2a9d8f' />)}
                    {status == 'Cancelado' && (<Icon name='bucket' size={size} color='#da1e37' />)}
                    {status != 'Cancelado' && status != 'Confirmado' && (<Icon name='bucket' size={size} color='#6c757d' />)}
                    <Text style={{ marginTop: 5 }}>{status}</Text>
                </View>
            </View>

            <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd' }}></View>

            {isExpand && renderInfo()}

            {isExpand && <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd' }}></View>}

            <TouchableOpacity style={styles.buttonColapse} onPress={() => setExpand(!isExpand)}>
                <Text style={styles.textColapse}>{isExpand ? '-' : '+'}</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf9f9',
        margin: 12,
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
    },

    buttonColapse: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f3ee'
    },
    textColapse: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    }
})

export default CardHistorico

/*

<View style={styles.infoCard}>
                    <Text style={styles.textInfo}>Tanque: <Text style={styles.text}>{data.tanque.nome}</Text></Text>
                    <Text style={styles.textInfo}>Tipo do leite: <Text style={styles.text}>{data.tanque.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</Text></Text>
                    {user.perfil === 2 && <Text style={styles.textInfo}>Solicitante: <Text style={styles.text}>{data.produtor?.nome || data.laticinio?.nomeFantasia}</Text></Text>}
                    <Text style={styles.textInfo}>Qtd. solicitada: <Text style={styles.text}>{data.quantidade} litros</Text></Text>
                    <Text style={styles.textInfo}>Valor: <Text style={styles.text}>R$ {data.valor.toFixed(2)}</Text></Text>
                    <Text style={styles.textInfo}>Data: <Text style={styles.text}>{dayHour}</Text></Text>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 8 }}></View>
                    {data.excluido === true ? <Text style={styles.textInfo}>Cancelado por: <Text style={styles.text}>{data.efetuou}</Text></Text>
                        : <Text style={styles.textInfo}>Responsável: <Text style={styles.text}>{data.tanque.responsavel.nome}</Text></Text>}
                    {data.observacao !== '' && <Text style={styles.textInfo}>Motivo: <Text style={styles.text}>{data.observacao}</Text></Text>}
                </View>

 */
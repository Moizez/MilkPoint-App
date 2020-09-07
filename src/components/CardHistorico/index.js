import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import moment from 'moment'
import 'moment/locale/pt-br'

import { AuthContext } from '../../contexts/auth'
import { numberToReal } from '../Helpers'

const CardHistorico = ({ data }) => {

    let dateHour = moment(data.dataNow).locale('pt-br').format('L [às] LT[h]')
    let requestDate = moment(data.dataSolicitacao).locale('pt-br').format('L [às] LT[h]')
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
            <TouchableOpacity style={{ ...styles.infoCard, backgroundColor: '#FFF' }} onPress={() => setExpand(false)}>
                <Text style={{ ...styles.textInfo, textAlign: 'center', marginBottom: 5 }}>Mais informações</Text>
                <Text style={styles.textInfo}>Tipo do leite: <Text style={styles.text}>{data.tanque.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</Text></Text>
                <Text style={styles.textInfo}>Valor: <Text style={styles.text}>{result}</Text></Text>
                {data.excluido ? <Text style={styles.textInfo}>Cancelado por: <Text style={styles.text}>{data.efetuou}</Text></Text>
                    : <Text style={styles.textInfo}>Responsável: <Text style={styles.text}>{data.tanque.responsavel.nome}</Text></Text>}
                <Text style={styles.textInfo}>Data da solicitação: <Text style={styles.text}>{requestDate}</Text></Text>
                {data.observacao !== '' && <Text style={styles.textInfo}>Motivo: <Text style={styles.text}>{data.observacao}</Text></Text>}
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.infoCard} onPress={()=> setExpand(!isExpand)}>
                    {user.perfil != 2 && <Text style={styles.textInfo}>Tanque: <Text style={styles.text}>{data.tanque.nome}</Text></Text>}
                    {user.perfil === 2 && <Text style={styles.textInfo}>Solicitante: <Text style={styles.text}>{data.produtor?.nome || data.laticinio?.nomeFantasia}</Text></Text>}
                    <Text style={styles.textInfo}>Qtd. solicitada: <Text style={styles.text}>{data.quantidade.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} litros</Text></Text>
                    <Text style={styles.textInfo}>Data: <Text style={styles.text}>{dateHour}</Text></Text>
                </TouchableOpacity>

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
        flex: 1.9,
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
    },
    buttonColapse: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f3ee',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5
    },
    textColapse: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    }
})

export default CardHistorico
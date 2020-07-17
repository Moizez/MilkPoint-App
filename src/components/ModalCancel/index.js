import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'

export default function ModalCancel({ dataTanque, onClose, onCancel }) {

    let dayHour = moment(dataTanque.dataNow).locale('pt-br').format('LLL')

    return (
        <View style={styles.container}>
            <View style={styles.modalView}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.textInfo}>Informações sobre a solicitação</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Icon name='close-circle' size={30} color={'#da1e37'} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 6 }}></View>

                <View style={styles.viewMessage}>
                    <Text style={styles.textMsgInfo}>Nome do tanque: {dataTanque.tanque.nome}</Text>
                    <Text style={styles.textMsgInfo}>Tipo do leite: {dataTanque.tanque.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</Text>
                    <Text style={styles.textMsgInfo}>Valor solicitado: {dataTanque.quantidade} litros</Text>
                    <Text style={styles.textMsgInfo}>Data: {dayHour}h</Text>
                </View>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginTop: 20 }}></View>

                <TouchableOpacity
                    style={{ ...styles.button, backgroundColor: '#da1e37' }}
                    onPress={onCancel}
                >
                    <Text style={styles.btnStyle}>Cancelar Solicitação</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: '95%',
        margin: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
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
        textAlign: 'center',
        fontSize: 18,
        marginRight: 25,
    },
    viewMessage: {
        marginTop: 15,
        width: '100%',
        backgroundColor: '#DDD',
        borderRadius: 10,
        padding: 10,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: '100%',
        marginTop: 20,
    },
    textMsgInfo: {
        fontSize: 16,
    },
    btnStyle: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
    },
})
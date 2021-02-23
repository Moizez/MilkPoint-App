import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'

import ActionButton from '../ActionButton'

export default function ModalCancel({ dataTanque, onClose, onCancel }) {

    let dayHour = moment(dataTanque.dataNow).locale('pt-br').format('D [de] MMM [às] LT[h]')

    return (
        <>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.offset} />
            </TouchableWithoutFeedback>
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.textInfo}>Informações sobre a solicitação</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Icon name='close-box' size={30} color={'#da1e37'} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewMessage}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.textMsgInfo}>Nome do tanque</Text>
                                <Text style={styles.text}>{dataTanque.tanque.nome}</Text>
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }}></View>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.textMsgInfo}>Tipo do leite</Text>
                                <Text style={styles.text}>{dataTanque.tanque.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 3 }}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.textMsgInfo}>Valor solicitado</Text>
                                <Text style={styles.text}>{dataTanque.quantidade} litros</Text>
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }}></View>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.textMsgInfo}>Data</Text>
                                <Text style={styles.text}>{dayHour}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 8 }}></View>

                    <ActionButton
                        onAction={onCancel}
                        btnColor='#da1e37'
                        title='Cancelar Solicitação'
                        nameIcon='delete-circle'
                        btnSize={'100%'}
                    />
                </View>
            </View>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.offset} />
            </TouchableWithoutFeedback>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView: {
        width: '95%',
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 10,
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
        borderRadius: 8,
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
        fontWeight: 'bold'
    },
    btnStyle: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
    },
    text: {
        fontWeight: 'normal'
    },
})
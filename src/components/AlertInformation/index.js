import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import ActionButton from '../ActionButton'

const AlertInformation = ({ message, onClose, onConfirm, dataInfo, qtd }) => {

    return (
        <View style={styles.centerView}>
            <View style={styles.modalView}>
                <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>{message}</Text>
                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginTop: 10 }}></View>
                <View style={styles.viewMessage}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={styles.textMsgInfo}>Nome</Text>
                            <Text style={styles.text}>{dataInfo.nome}</Text>
                        </View>
                        <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }}></View>
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={styles.textMsgInfo}>Tipo do leite</Text>
                            <Text style={styles.text}>{dataInfo.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</Text>
                        </View>
                        <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }}></View>
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={styles.textMsgInfo}>Valor</Text>
                            <Text style={styles.text}>{qtd} litros</Text>
                        </View>
                    </View>
                </View>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginBottom: 10 }}></View>

                <View style={styles.viewButtons}>
                    <ActionButton
                        onAction={onClose}
                        btnColor='#da1e37'
                        title='Cancelar'
                        nameIcon='close-circle'
                    />

                    <ActionButton
                        onAction={() => onConfirm(qtd)}
                        btnColor='#2a9d8f'
                        title='Confirmar'
                        nameIcon='check-circle'
                    />
                </View>

            </View >
        </View >
    );
}

const styles = StyleSheet.create({
    centerView: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
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
    viewButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    viewMessage: {
        marginVertical: 10,
        width: '100%',
        backgroundColor: '#DDD',
        borderRadius: 8,
        padding: 5,
    },
    buttons: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: '45%',
        marginTop: 20,
    },
    textMsgInfo: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    textButtons: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
    },
    modalText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 3.85,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 5,
        marginRight: 15,
    },
    text: {
        fontSize: 17
    }
})

export default AlertInformation
import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import ActionButton from '../ActionButton'

const AlertSimpleInfo = ({ message, onClose, onConfirm }) => {

    return (
        <View style={styles.container}>
            <View style={styles.modalView}>
                <View style={styles.viewMessage}>
                    <Text style={{ textAlign: 'center', fontSize: 17 }}>{message}</Text>
                </View>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 6 }}></View>

                <View style={styles.viewButtons}>
                    <ActionButton
                        onAction={onClose}
                        btnColor='#da1e37'
                        title='Fechar'
                        nameIcon='close-circle'
                    />
                    <ActionButton
                        onAction={onConfirm}
                        btnColor='#2a9d8f'
                        title='Confirmar'
                        nameIcon='check-circle'
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
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
        width: '100%',
        borderRadius: 10,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: '45%',
        marginTop: 20,
    },
    textMsgInfo: {
        fontSize: 16,
    },
    textButton: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
    },
    modalTitle: {
        marginRight: 15,
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
        elevation: 5
    }
})

export default AlertSimpleInfo
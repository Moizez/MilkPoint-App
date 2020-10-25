import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableWithoutFeedback } from 'react-native'

import ActionButton from '../ActionButton'

export default function ModalDeposito({ onClose, onConfirme }) {

    const [quantidade, setQuantidade] = useState()

    return (
        <>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.offset} />
            </TouchableWithoutFeedback>
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <Text style={styles.textInfo}>Digite o valor da sua solicitação</Text>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 5 }}></View>

                    <View style={{ alignItems: 'center' }}>
                        <TextInput style={styles.input}
                            placeholder='Quantidade em litros'
                            autoCorrect={false}
                            autoCapitalize='none'
                            keyboardType="phone-pad"
                            value={quantidade}
                            onChangeText={(quantidade) => setQuantidade(quantidade)}
                        />
                    </View>

                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 5 }}></View>

                    <View style={styles.viewButtons}>

                        <ActionButton
                            onAction={onClose}
                            btnColor='#da1e37'
                            title='Cancelar'
                            nameIcon='close-circle'
                        />
                        <ActionButton
                            onAction={() => onConfirme(quantidade)}
                            btnColor='#2a9d8f'
                            title='Enviar'
                            nameIcon='basket-fill'
                        />
                    </View>
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
        fontWeight: 'bold', textAlign: 'center', fontSize: 18, marginVertical: 5
    },
    input: {
        backgroundColor: '#DDD',
        textAlign: 'center',
        fontSize: 18,
        width: '96%',
        color: '#000',
        marginVertical: 10,
        padding: 10,
        borderRadius: 8,
    },
    viewButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttons: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: '43%',
        marginTop: 10,
    },
    btnStyle: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
    }
})
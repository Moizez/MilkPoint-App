import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'

export default function ModalDepositoRetirada({ onClose, onConfirme }) {

    const [quantidade, setQuantidade] = useState()

    return (
        <View style={styles.container}>
            <View style={styles.modalView}>
                <Text style={styles.textInfo}>Digite o valor da sua solicitação</Text>
                <TextInput style={styles.input}
                    placeholder='Quantidade em litros'
                    autoCorrect={false}
                    autoCapitalize='none'
                    keyboardType='numeric'
                    value={quantidade}
                    autoFocus={true}
                    onChangeText={(quantidade) => setQuantidade(quantidade)}
                />

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 6 }}></View>

                <View style={styles.viewButtons}>
                    <TouchableOpacity
                        style={{ ...styles.buttons, backgroundColor: '#da1e37' }}
                        onPress={() => onClose()}
                    >
                        <Text style={styles.btnStyle}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ ...styles.buttons, backgroundColor: '#2a9d8f', marginLeft: 15 }}
                        onPress={() => onConfirme(quantidade)}
                    >
                        <Text style={styles.btnStyle}>Enviar</Text>
                    </TouchableOpacity>
                </View>

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
        fontWeight: 'bold', textAlign: 'center', fontSize: 16
    },
    input: {
        backgroundColor: '#DDD',
        textAlign: 'center',
        fontSize: 18,
        width: '90%',
        color: '#000',
        marginTop: 15,
        marginBottom: 15,
        padding: 10,
        borderRadius: 8,
    },
    viewButtons: {
        flexDirection: 'row',
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
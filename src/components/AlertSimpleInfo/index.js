import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import LottieView from 'lottie-react-native'

const AlertSimpleInfo = ({ title, message, onClose, onConfirm, action }) => {

    const [observation, setObservation] = useState('')

    return (
        <View style={styles.container}>

            <View style={styles.container}>
                <View style={styles.modalView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.modalTitle}>{title}</Text>
                        <LottieView style={{ height: 40 }} source={require('../../assets/lottie/information-icon.json')} autoPlay loop />
                    </View>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 6 }}></View>

                    <View style={styles.viewMessage}>
                        <Text style={{ textAlign: 'center', fontSize: 18 }}>{message}</Text>
                    </View>

                    {action &&
                        <TextInput style={styles.input}
                            placeholder='Por favor, informe o motivo do cancelamento'
                            autoCorrect={true}
                            autoCapitalize='sentences'
                            multiline={true}
                            value={observation}
                            onChangeText={(text) => setObservation(text)}
                        />
                    }

                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 6 }}></View>

                    <View style={styles.viewButtons}>
                        <TouchableOpacity
                            style={{ ...styles.buttons, backgroundColor: '#da1e37' }}
                            onPress={onClose}
                        >
                            <Text style={styles.textButton}>Voltar</Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ ...styles.buttons, backgroundColor: '#2a9d8f', marginLeft: 15 }}
                            onPress={() => onConfirm(observation)}
                        >
                            <Text style={styles.textButton}>Continuar</Text>

                        </TouchableOpacity>

                    </View>

                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
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
    input: {
        backgroundColor: '#DDD',
        textAlign: 'center',
        fontSize: 18,
        width: '95%',
        height: 100,
        color: '#000',
        marginTop: 15,
        marginBottom: 15,
        padding: 10,
        borderRadius: 8,
    },
    viewButtons: {
        flexDirection: 'row',
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
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native'

const AlertInformation = ({ title, message, onClose, onConfirm, dataInfo, qtd }) => {

    return (
        <View style={styles.centerView}>

            <View style={styles.modalView}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.modalText}>{title}</Text>
                    <LottieView style={{ height: 40 }} source={require('../../assets/lottie/information-icon.json')} autoPlay loop />
                </View>
                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 6 }}></View>

                <View style={styles.viewMessage}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>{message}</Text>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 6 }}></View>
                    <Text style={styles.textMsgInfo}><Text style={{ fontWeight: 'bold' }}>Nome do tanque: </Text>{dataInfo.nome}</Text>
                    <Text style={styles.textMsgInfo}><Text style={{ fontWeight: 'bold' }}>Tipo do leite: </Text>{dataInfo.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</Text>
                    <Text style={styles.textMsgInfo}><Text style={{ fontWeight: 'bold' }}>Valor solicitado: </Text>{qtd} litros</Text>
                </View>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginTop: 20 }}></View>

                <View style={styles.viewButtons}>
                    <TouchableOpacity
                        style={{ ...styles.buttons, backgroundColor: '#da1e37' }}
                        onPress={onClose}
                    >
                        <Text style={styles.textButtons}>Cancelar</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ ...styles.buttons, backgroundColor: '#2a9d8f', marginLeft: 15 }}
                        onPress={() => onConfirm(qtd)}
                    >
                        <Text style={styles.textButtons}>Continuar</Text>

                    </TouchableOpacity>

                </View>

            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    centerView: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flex: 1,
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
    viewButtons: {
        flexDirection: 'row',
    },
    viewMessage: {
        marginTop: 15,
        width: '100%',
        backgroundColor: '#ececec',
        borderRadius: 10,
        padding: 10,
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
    }
})

export default AlertInformation
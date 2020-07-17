import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'

const ModalChoice = ({ dataInfo, hideModal, handleCancel, handleConfirm, titlePerfil, infoPerfil }) => {

    let dayHour = moment(dataInfo.dataNow).locale('pt-br').format('dddd[,] L [às] LT[h]')

    return (
        <View style={styles.container}>
            <View style={styles.modalView}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.title}>Informações sobre a solicitação</Text>
                    <TouchableOpacity onPress={hideModal}>
                        <Icon name='close-circle' size={30} color={'#da1e37'} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 6 }}></View>

                <View style={styles.viewMessage}>
                    <Text style={styles.textInfo}>Tanque: <Text style={styles.text}>{dataInfo.tanque.nome}</Text></Text>
                    <Text style={styles.textInfo}>Tipo do leite: <Text style={styles.text}>{dataInfo.tanque.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</Text></Text>
                    <Text style={styles.textInfo}>Valor solicitado: <Text style={styles.text}>{dataInfo.quantidade} litros</Text></Text>
                    <Text style={styles.textInfo}>{titlePerfil} <Text style={styles.text}>{infoPerfil}</Text></Text>
                    <Text style={styles.textInfo}>Data: <Text style={styles.text}>{dayHour}</Text></Text>
                </View>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginTop: 20 }}></View>

                <View style={styles.viewButtons}>
                    <TouchableOpacity
                        style={{ ...styles.button, backgroundColor: '#da1e37' }}
                        onPress={() => handleCancel()}
                    >
                        <Text style={styles.btnStyle}>Cancelar Solicitação</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ ...styles.button, backgroundColor: '#2a9d8f', marginLeft: 15 }}
                        onPress={() => handleConfirm(dataInfo.quantidade)}
                    >
                        <Text style={styles.btnStyle}>Confirmar Solicitação</Text>

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
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 25,
    },
    textInfo: {
        fontWeight: 'bold',
        fontSize: 14.5,
    },
    text: {
        fontWeight: 'normal'
    },
    viewMessage: {
        marginTop: 15,
        width: '100%',
        backgroundColor: '#ececec',
        borderRadius: 10,
        padding: 10,
    },
    viewButtons: {
        flexDirection: 'row',
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: '45%',
        marginTop: 20,
    },
    textMsgInfo: {
        fontSize: 15,
    },
    btnStyle: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
    },
})

export default ModalChoice 
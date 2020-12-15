import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'

import ActionButton from '../ActionButton'

const ModalChoice = ({
    dataInfo, hideModal, handleConfirm, obs,
    titlePerfil, infoPerfil, doneCancel, statusTanque
}) => {

    let dayHour = moment(dataInfo.dataNow).locale('pt-br').format('D [de] MMM [às] LT[h]')
    const [isExpand, setExpand] = useState(false)
    const [observation, setObservation] = useState(obs)

    const handleDescription = () => {
        return (
            <>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.textInfo}>Deseja realmente RECUSAR esta solicitação?</Text>

                    <TextInput style={styles.input}
                        placeholder='Por favor, informe o motivo'
                        autoCorrect={true}
                        autoCapitalize='sentences'
                        multiline={true}
                        value={observation}
                        onChangeText={(text) => setObservation(text)}
                    />

                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 3 }}></View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <ActionButton
                            onAction={() => setExpand(!isExpand)}
                            btnColor='#da1e37'
                            title='Fechar'
                            nameIcon='close-circle'
                        />

                        <View style={{ marginHorizontal: 8 }} />

                        <ActionButton
                            onAction={() => doneCancel(observation)}
                            btnColor='#2a9d8f'
                            title='Confirmar'
                            nameIcon='check-circle'
                        />
                    </View>
                </View>
            </>
        )
    }


    return (
        <>
            <TouchableWithoutFeedback onPress={hideModal}>
                <View style={styles.offset} />
            </TouchableWithoutFeedback>
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.title}>Informações sobre a solicitação</Text>
                        <TouchableOpacity onPress={hideModal}>
                            <Icon name='close-box' size={30} color={'#da1e37'} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewMessage}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.textInfo}>Tanque</Text>
                                <Text style={styles.text}>{dataInfo.tanque.nome}</Text>
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }}></View>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.textInfo}>Tipo do leite</Text>
                                <Text style={styles.text}>{dataInfo.tanque.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</Text>
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }}></View>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.textInfo}>Quantidade</Text>
                                <Text style={styles.text}>{dataInfo.quantidade.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} litros</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 3 }}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.textInfo}>{titlePerfil}</Text>
                                <Text style={styles.text}>{infoPerfil}</Text>
                            </View>
                            <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd', marginHorizontal: 3 }}></View>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.textInfo}>Data</Text>
                                <Text style={styles.text}>{dayHour}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 10 }}></View>

                    {!isExpand &&
                        <View style={styles.viewButtons}>
                            <ActionButton
                                onAction={() => setExpand(!isExpand)}
                                btnColor='#da1e37'
                                title='Recusar'
                                nameIcon='delete-circle'
                            />
                            {statusTanque &&
                                <ActionButton
                                    onAction={() => handleConfirm(dataInfo.quantidade)}
                                    btnColor='#2a9d8f'
                                    title='Aceitar'
                                    nameIcon='check-circle'
                                />
                            }
                        </View>
                    }

                    {isExpand && handleDescription()}
                </View>
            </View>
            <TouchableWithoutFeedback onPress={hideModal}>
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
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 25,
    },
    textInfo: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    text: {
        fontWeight: 'normal'
    },
    viewMessage: {
        marginTop: 15,
        width: '100%',
        backgroundColor: '#DDD',
        borderRadius: 8,
        padding: 10,
    },
    viewButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around'
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
    input: {
        backgroundColor: '#DDD',
        textAlign: 'center',
        fontSize: 17,
        width: 320,
        height: 60,
        color: '#000',
        marginVertical: 10,
        padding: 15,
        borderRadius: 8,
    },
})

export default ModalChoice 
import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import ActionButton from '../ActionButton'

export default function ModalRetirada({ onClose, onConfirme, data }) {

    const [quantidade, setQuantidade] = useState()
    const [isExpand, setExpand] = useState(false)
    const { qtdAtual } = data

    const renderParcial = () => {
        return (
            <>
                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 5 }}></View>
                <Text style={styles.textInfo}>Digite o valor da sua solicitação</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <TextInput style={styles.input}
                        placeholder='Quantidade'
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType="phone-pad"
                        value={quantidade}
                        onChangeText={(quantidade) => setQuantidade(quantidade)}
                    />
                    <ActionButton
                        onAction={() => onConfirme(quantidade)}
                        btnColor='#2a9d8f'
                        title='Enviar'
                        nameIcon='basket-unfill'
                        btnSize={'45%'}
                    />
                </View>
            </>
        )
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.offset} />
            </TouchableWithoutFeedback>
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 5 }}>
                        <Text style={styles.textInfo}>Retirada PARCIAL ou TOTAL?</Text>
                        <TouchableOpacity onPress={onClose} style={{ marginLeft: 25 }}>
                            <Icon name='close-box' size={30} color={'#da1e37'} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewButtons}>
                        <ActionButton
                            onAction={() => setExpand(!isExpand)}
                            btnColor='#2a9d8f'
                            title='Parcial'
                            nameIcon='chart-donut'
                        />

                        <ActionButton
                            onAction={() => onConfirme(qtdAtual)}
                            btnColor='#da1e37'
                            title='Total'
                            nameIcon='gauge-full'
                        />
                    </View>
                    {isExpand && renderParcial()}
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
        fontWeight: 'bold', textAlign: 'center', fontSize: 17
    },
    input: {
        backgroundColor: '#DDD',
        textAlign: 'center',
        fontSize: 18,
        width: '45%',
        color: '#000',
        marginVertical: 15,
        padding: 10,
        borderRadius: 5,
        height: 45,
    },
    viewButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    btnParcial: {
        backgroundColor: '#da1e37',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 45,
        width: 88,
    }
})
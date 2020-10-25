import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import 'moment/locale/pt-br'

import DatePicker from '../DatePicker'
import ActionButton from '../ActionButton'

export default function ModalSearch({
    type, hideModal, filterFifteenDays, changeCheck, findByName,
    filterOneMonth, filterCustomDays, closeSelectionModal
}) {

    const [show, setShow] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [isExpand, setExpand] = useState(false)
    const [value, setValue] = useState('')

    const onChange = (value) => {
        setShow(Platform.OS === 'ios')
        setSelectedDate(value)
        type ? changeCheck(true) : changeCheck(false)
        filterCustomDays(value)
        closeSelectionModal()
        hideModal()
        //onLoad()
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={hideModal}>
                <View style={styles.offset} />
            </TouchableWithoutFeedback>
            <View style={styles.container}>
                <View style={styles.containerModal}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...styles.textInfo, marginRight: 15 }}>Busca personalizada: {type ? 'DEPÓSITOS' : 'RETIRADAS'}</Text>
                        <TouchableOpacity onPress={hideModal}>
                            <Icon name='close-box' size={28} color={'#da1e37'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#DDD', marginVertical: 5 }}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <ActionButton
                            onAction={() => {
                                type ? changeCheck(true) : changeCheck(false)
                                filterFifteenDays()
                                closeSelectionModal()
                                hideModal()
                            }}
                            btnColor='#e9c46a'
                            title='Últimos 15 dias'
                            nameIcon='calendar-range'
                            fontSize={16}
                            iconSize={25}
                            btnSize='48%'
                            colorText='#000'
                            colorIcon='#000'
                            marginRight={12}
                        />

                        <ActionButton
                            onAction={() => {
                                type ? changeCheck(true) : changeCheck(false)
                                filterOneMonth()
                                closeSelectionModal()
                                hideModal()
                            }}
                            btnColor='#e76f51'
                            title='Últimos 30 dias'
                            nameIcon='calendar-month'
                            btnSize='48%'
                            fontSize={16}
                            iconSize={25}
                            colorText='#000'
                            colorIcon='#000'
                            marginRight={12}
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.textDays}>Selecione a data inicial da busca</Text>
                        <ActionButton
                            onAction={() => setShow(true)}
                            btnColor='#adb5bd'
                            title={moment(selectedDate).locale('pt-br').format('dddd, D [de] MMMM [de] YYYY')}
                            nameIcon='calendar-month'
                            btnSize='98%'
                            fontSize={16}
                            iconSize={25}
                            colorText='#000'
                            colorIcon='#000'
                        />

                    </View>
                    <View>
                        <Text style={styles.textDays}>Busca por nome do {type ? 'produtor' : 'laticínio'}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 2 }}>
                            <TextInput style={styles.input}
                                placeholder='Digite um nome'
                                autoCorrect={false}
                                autoCapitalize='sentences'
                                keyboardType='default'
                                value={value}
                                onChangeText={setValue}
                            />
                            <View style={{ marginHorizontal: 5 }} />
                            <ActionButton
                                onAction={() => {
                                    if (value) {
                                        findByName(value, type)
                                        closeSelectionModal()
                                        hideModal()
                                        onLoad()
                                        setValue('')
                                    } else { setAlertVisible(true) }
                                }}
                                btnColor={type ? '#2a9d8f' : '#da1e37'}
                                nameIcon='magnify'
                                btnSize={50}
                            />
                        </View>
                    </View>
                </View>

                {isExpand && searchProfile()}

                {
                    show && (
                        <DatePicker
                            date={selectedDate}
                            onChange={onChange}
                            display='spinner'
                        />)
                }
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
    containerModal: {
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
    input: {
        backgroundColor: '#DDD',
        textAlign: 'center',
        fontSize: 17,
        width: '79%',
        height: 45,
        color: '#000',
        padding: 10,
        borderRadius: 5,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: '90%',
        marginTop: 8,
    },
    textInfo: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        marginRight: 25,
    },
    textDays: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center'
    }
})
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import 'moment/locale/pt-br'

import DatePicker from '../DatePicker'

export default function ModalSearch({
    type, hideModal, changeCheck, checkDateDeposito, filterFifteenDaysDeposito,
    filterOneMonthDeposito, checkDateRetirada, filterFifteenDaysRetirada,
    filterOneMonthRetirada, filterCustomDays
}) {

    const [show, setShow] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())

    const onChange = (value) => {
        setShow(Platform.OS === 'ios')
        setSelectedDate(value)
        filterCustomDays(value)
        hideModal()
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerModal}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...styles.textInfo, marginRight: 15 }}>Busca personalizada: {type ? 'DEPÓSITOS' : 'RETIRADAS'}</Text>
                    <TouchableOpacity onPress={hideModal}>
                        <Icon name='close-circle' size={30} color={'#da1e37'} />
                    </TouchableOpacity>
                </View>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#DDD', marginVertical: 5 }}></View>

                {type ?
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.someDays} onPress={() => {
                            filterFifteenDaysDeposito()
                            hideModal()
                        }}>
                            <Text style={styles.textDays}>Últimos 15 dias</Text>
                            <Icon name='calendar-clock' size={25} color={'#000'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.someDays, marginLeft: 10, backgroundColor: '#e76f51' }} onPress={() => {
                            filterOneMonthDeposito()
                            hideModal()
                        }}>
                            <Text style={styles.textDays}>Últimos 30 dias</Text>
                            <Icon name='calendar-clock' size={25} color={'#000'} />
                        </TouchableOpacity>
                    </View>

                    : <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.someDays} onPress={() => {
                            filterFifteenDaysRetirada()
                            hideModal()
                        }}>
                            <Text style={styles.textDays}>Últimos 15 dias</Text>
                            <Icon name='calendar-clock' size={25} color={'#000'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.someDays, marginLeft: 10, backgroundColor: '#e76f51' }} onPress={() => {
                            filterOneMonthRetirada()
                            hideModal()
                        }}>
                            <Text style={styles.textDays}>Últimos 30 dias</Text>
                            <Icon name='calendar-clock' size={25} color={'#000'} />
                        </TouchableOpacity>
                    </View>
                }

                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.textDays}>Selecione a data inicial da busca:</Text>
                    <TouchableOpacity style={styles.dateSearch} onPress={() => setShow(true)}>
                        <Text style={styles.textDays}>{moment(selectedDate).locale('pt-br').format('dddd, D [de] MMMM [de] YYYY')}</Text>
                        <Icon name='calendar' size={25} color={'#000'} />
                    </TouchableOpacity>
                </View>

            </View>

            {
                show && (
                    <DatePicker
                        date={selectedDate}
                        onChange={onChange}
                        display='spinner'
                    />)
            }

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
    containerModal: {
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
        width: '90%',
        color: '#000',
        marginTop: 15,
        marginBottom: 15,
        padding: 10,
        borderRadius: 8,
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
    btnStyle: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
    },
    someDays: {
        backgroundColor: '#e9c46a',
        height: 35,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginVertical: 15,
        flexDirection: 'row',
    },
    dateSearch: {
        backgroundColor: '#adb5bd',
        height: 35,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginVertical: 15,
        flexDirection: 'row'
    },
    textDays: {
        fontSize: 16,
        marginRight: 5
    }
})
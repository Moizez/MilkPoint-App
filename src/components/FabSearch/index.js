import React, { useState } from 'react'
import { View, Modal, TextInput, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { FAB } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import 'moment/locale/pt-br'

import DatePicker from '../DatePicker'
import ActionButton from '../ActionButton'
import AlertErrorSuccess from '../AlertErrorSuccess'

export default function FabSearch(
    {
        getValor, filterFifteenDays, filterOneMonth, filterCustomDays, onLoad,
        styleFab, mainIcon, mainIconColor, icon1, label1, color1, icon2, label2, color2
    }) {

    //Fab button
    const [state, setState] = useState({ open: false })
    const onStateChange = ({ open }) => setState({ open })
    const { open } = state

    const [isVisible, setVisible] = useState(false)
    const [alertVisible, setAlertVisible] = useState(false)
    const [modalSearch, setModalSearch] = useState(false)
    const [value, setValue] = useState()
    const [show, setShow] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    let error = require('../../assets/lottie/error-icon.json')

    function onChange(value) {
        setShow(Platform.OS === 'ios')
        setSelectedDate(value)
        filterCustomDays(value)
        setModalSearch(false)
    }

    return (
        <>
            <Modal
                animationType='fade'
                transparent={true}
                visible={alertVisible}
            >
                {alertVisible &&
                    <AlertErrorSuccess
                        onClose={() => setAlertVisible(false)}
                        title='Aviso'
                        message={'Digite um valor válido!'}
                        titleButton='Ok'
                        buttonColor={'#292b2c'}
                        jsonPath={error}
                    />
                }
            </Modal>

            <FAB.Group
                fabStyle={styleFab}
                color={mainIconColor}
                open={open}
                icon={open ? 'close' : mainIcon}
                actions={[
                    {
                        icon: icon2,
                        label: label2,
                        color: color2,
                        style: styles.fabActions,
                        onPress: () => setVisible(true),
                    },
                    {
                        icon: icon1,
                        label: label1,
                        color: color1,
                        style: styles.fabActions,
                        onPress: () => setModalSearch(true),
                    },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                    if (open) {
                        // do something if the speed dial is open
                    }
                }}
            />

            <Modal
                animationType='fade'
                transparent={true}
                visible={isVisible}
            >
                <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                    <View style={styles.offset} />
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <View style={styles.containerModal}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.textInfo}>Buscar pelo valor da solicitação</Text>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Icon name='close-box' size={30} color={'#da1e37'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput style={styles.input}
                                placeholder='Digite um valor'
                                autoCorrect={false}
                                autoCapitalize='none'
                                keyboardType='phone-pad'
                                value={value}
                                autoFocus={true}
                                onChangeText={setValue}
                            />
                            <View style={{ marginHorizontal: 5 }} />
                            <ActionButton
                                onAction={() => {
                                    if (value) {
                                        getValor(value)
                                        setVisible(false)
                                        //onLoad()
                                        setValue('')
                                    } else { setAlertVisible(true) }
                                }}
                                btnColor='#000'
                                nameIcon='magnify'
                                btnSize={50}
                            />
                        </View>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                    <View style={styles.offset} />
                </TouchableWithoutFeedback>
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={modalSearch}
            >
                <TouchableWithoutFeedback onPress={() => setModalSearch(false)}>
                    <View style={styles.offset} />
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <View style={styles.containerModal}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...styles.textInfo, marginRight: 120 }}>Busca personalizada</Text>
                            <TouchableOpacity onPress={() => setModalSearch(false)}>
                                <Icon name='close-box' size={30} color={'#da1e37'} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#DDD', marginVertical: 5 }}></View>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.someDays} onPress={() => {
                                filterFifteenDays()
                                setModalSearch(false)
                                //onLoad()
                            }}>
                                <Text style={styles.textDays}>Últimos 15 dias</Text>
                                <Icon name='calendar-clock' size={25} color={'#000'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ ...styles.someDays, marginLeft: 10, backgroundColor: '#e76f51' }} onPress={() => {
                                filterOneMonth()
                                setModalSearch(false)
                            }}>
                                <Text style={styles.textDays}>Últimos 30 dias</Text>
                                <Icon name='calendar-clock' size={25} color={'#000'} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.textDays}>Selecione a data inicial da busca:</Text>
                            <TouchableOpacity style={styles.dateSearch} onPress={() => setShow(true)}>
                                <Text style={styles.textDays}>{moment(selectedDate).locale('pt-br').format('dddd, D [de] MMMM [de] YYYY')}</Text>
                                <Icon name='calendar' size={25} color={'#000'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => setModalSearch(false)}>
                    <View style={styles.offset} />
                </TouchableWithoutFeedback>
            </Modal>
            {
                show && (
                    <DatePicker
                        date={selectedDate}
                        onChange={onChange}
                        display={'spinner'}
                    />)
            }
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
        margin: 10,
        backgroundColor: '#FFF',
        borderRadius: 8,
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
        fontSize: 17,
        width: '74%',
        height: 45,
        color: '#000',
        marginTop: 15,
        marginBottom: 15,
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
    btnStyle: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
    },
    someDays: {
        backgroundColor: '#e9c46a',
        height: 45,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginVertical: 15,
        flexDirection: 'row',
    },
    dateSearch: {
        backgroundColor: '#adb5bd',
        height: 45,
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
    },
    fabActions: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
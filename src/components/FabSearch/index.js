import React, { useState, useContext } from 'react'
import { View, Modal, TextInput, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { FAB } from 'react-native-paper'
import { AuthContext } from '../../contexts/auth'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import 'moment/locale/pt-br'

import DatePicker from '../DatePicker'
import ActionButton from '../ActionButton'
import AlertErrorSuccess from '../AlertErrorSuccess'

export default function FabSearch(
    {
        getValor, filterFifteenDays, filterOneMonth, filterCustomDays, onLoad,
        styleFab, mainIcon, mainIconColor, loadResolved
    }) {

    const { user } = useContext(AuthContext)

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
            <FAB.Group
                fabStyle={styleFab}
                color={mainIconColor}
                open={open}
                icon={open ? 'close' : mainIcon}
                actions={[
                    {
                        icon: 'magnify',
                        label: 'Busca avançada',
                        color: '#7209b7',
                        style: styles.fabActions,
                        onPress: () => {
                            setModalSearch(true)
                        }
                    },
                    {
                        icon: 'beaker-remove',
                        label: 'Listar por cancelados',
                        color: '#da1e37',
                        style: styles.fabActions,
                        onPress: () => {
                            loadResolved(false)
                        },
                    },
                    {
                        icon: 'beaker-check',
                        label: 'Listar por confirmados',
                        color: '#2a9d8f',
                        style: styles.fabActions,
                        onPress: () => {
                            loadResolved(true)
                        },
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
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Icon name='close-box' size={30} color={'#da1e37'} />
                            </TouchableOpacity>
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
                            <Text style={{ ...styles.textInfo, marginRight: 160 }}>Busca avançada</Text>
                            <TouchableOpacity onPress={() => setModalSearch(false)}>
                                <Icon name='close-box' size={30} color={'#da1e37'} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#DDD', marginVertical: 5 }}></View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <ActionButton
                                onAction={() => {
                                    filterFifteenDays()
                                    setModalSearch(false)
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
                                    filterOneMonth()
                                    setModalSearch(false)
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
                                nameIcon='calendar-search'
                                btnSize='98%'
                                fontSize={16}
                                iconSize={25}
                                colorText='#000'
                                colorIcon='#000'
                            />
                        </View>
                        <View>
                            <Text style={styles.textDays}>Buscar pelo valor da solicitação</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 2 }}>
                                <TextInput style={styles.input}
                                    placeholder='Digite um valor'
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    keyboardType='phone-pad'
                                    value={value}
                                    onChangeText={(value) => setValue(value)}
                                />
                                <View style={{ marginHorizontal: 5 }} />
                                <ActionButton
                                    onAction={() => {
                                        if (value) {
                                            getValor(value)
                                            setModalSearch(false)
                                            setValue('')
                                        } else { setAlertVisible(true) }
                                    }}
                                    btnColor={user.perfil === 1 ? '#2a9d8f' : '#da1e37'}
                                    nameIcon='magnify'
                                    btnSize={50}
                                />
                            </View>
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
    },
    fabActions: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
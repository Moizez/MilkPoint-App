import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FAB } from 'react-native-paper'

import ModalSearch from '../ModalSearch'

export default function FabGroup(
    {
        filterFifteenDaysDeposito, filterOneMonthDeposito, filterCustomDays, changeCheck,
        filterFifteenDaysRetirada, filterOneMonthRetirada, styleFab, mainIcon, mainIconColor,
        checkDateDeposito, checkDateRetirada, findByName
    }) {

    //Fab button
    const [state, setState] = useState({ open: false })
    const onStateChange = ({ open }) => setState({ open })
    const { open } = state

    const [isVisible, setVisible] = useState(false)
    const [modalName, setModalName] = useState(false)
    const [value, setValue] = useState('')


    const [type, setType] = useState(false)

    const hideModal = () => setVisible(false)

    return (
        <>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalName}
            >
                <View style={styles.container}>
                    <View style={styles.containerModal}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.textInfo}>Buscar pelo nome</Text>
                            <TouchableOpacity onPress={() => setModalName(false)}>
                                <Icon name='close-circle' size={30} color={'#da1e37'} />
                            </TouchableOpacity>
                        </View>
                        <TextInput style={styles.input}
                            placeholder='Digite o nome procurado'
                            autoCorrect={false}
                            autoCapitalize='none'
                            keyboardType='default'
                            value={value}
                            autoFocus={true}
                            onChangeText={setValue}
                        />

                        <TouchableOpacity
                            style={{ ...styles.button, backgroundColor: '#292b2c' }}
                            onPress={() => {
                                findByName(value)
                                setModalName(false)
                                setValue('')
                            }}
                        >
                            <Text style={styles.btnStyle}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <FAB.Group
                fabStyle={styleFab}
                color={mainIconColor}
                open={open}
                icon={open ? 'close' : mainIcon}
                actions={[
                    {
                        icon: 'basket-fill',
                        label: 'Listar por depósitos',
                        color: '#2a9d8f',
                        style: styles.fabActions,
                        onPress: () => {
                            setType(true)
                            setVisible(true)
                            changeCheck(true)
                            checkDateDeposito()
                        },
                    },
                    {
                        icon: 'basket-unfill',
                        label: 'Listar por retiradas',
                        color: '#da1e37',
                        style: styles.fabActions,
                        onPress: () => {
                            setType(false)
                            setVisible(true)
                            changeCheck(false)
                            checkDateRetirada()
                        },
                    },
                    {
                        icon: 'account-search',
                        label: 'Listar por pessoa',
                        color: '#6d597a',
                        style: styles.fabActions,
                        onPress: () => {}//setModalName(true) 
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
                <ModalSearch
                    type={type}
                    hideModal={hideModal}
                    changeCheck={changeCheck}
                    checkDateDeposito={checkDateDeposito}
                    checkDateRetirada={checkDateRetirada}
                    filterFifteenDaysDeposito={filterFifteenDaysDeposito}
                    filterOneMonthDeposito={filterOneMonthDeposito}
                    filterFifteenDaysRetirada={filterFifteenDaysRetirada}
                    filterOneMonthRetirada={filterOneMonthRetirada}
                    filterCustomDays={filterCustomDays}
                />

            </Modal>
        </>
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
    },
    fabActions: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

/*


 */
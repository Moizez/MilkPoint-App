import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FAB } from 'react-native-paper'

import ModalSearch from '../ModalSearch'
import AlertErrorSuccess from '../AlertErrorSuccess'
import ActionButton from '../ActionButton'

export default function FabGroup(
    {
        filterFifteenDays, filterOneMonth, filterCustomDays, changeCheck,
        styleFab, mainIcon, mainIconColor, findByName, onLoad
    }) {

    //Fab button
    const [state, setState] = useState({ open: false })
    const onStateChange = ({ open }) => setState({ open })
    const { open } = state

    const [alertVisible, setAlertVisible] = useState(false)
    const [isVisible, setVisible] = useState(false)
    const [modalName, setModalName] = useState(false)
    const [selectionModal, setSelectionModal] = useState(false)

    const [type, setType] = useState(false)

    const hideModal = () => setVisible(false)
    const closeSelectionModal = () => setSelectionModal(false)
    const closeAlertErroSuccess = () => setAlertVisible(false)
    let error = require('../../assets/lottie/error-icon.json')

    return (
        <>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalName}
            >
                <TouchableWithoutFeedback onPress={() => setModalName(false)}>
                    <View style={styles.offset} />
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <View style={styles.containerModal}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View>
                                <Text style={styles.textInfo}>Buscar pelo nome do {type ? 'produtor' : 'laticínio'}</Text>
                            </View>
                            <TouchableOpacity style={{ marginLeft: 45 }} onPress={() => setModalName(false)}>
                                <Icon name='close-box' size={30} color={'#da1e37'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => setModalName(false)}>
                    <View style={styles.offset} />
                </TouchableWithoutFeedback>
            </Modal>

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
                            setSelectionModal(true)
                        }
                    },
                    {
                        icon: 'basket-unfill',
                        label: 'Listar por retiradas',
                        color: '#da1e37',
                        style: styles.fabActions,
                        onPress: () => {
                            changeCheck(false)
                        },
                    },
                    {
                        icon: 'basket-fill',
                        label: 'Listar por depósitos',
                        color: '#2a9d8f',
                        style: styles.fabActions,
                        onPress: () => {
                            changeCheck(true)
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
                <ModalSearch
                    type={type}
                    onLoad={onLoad}
                    hideModal={hideModal}
                    findByName={findByName}
                    changeCheck={changeCheck}
                    filterFifteenDays={filterFifteenDays}
                    filterOneMonth={filterOneMonth}
                    filterCustomDays={filterCustomDays}
                    closeSelectionModal={closeSelectionModal}
                />
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={alertVisible}
            >
                {alertVisible &&
                    <AlertErrorSuccess
                        onClose={closeAlertErroSuccess}
                        title='Aviso'
                        message={'Digite um nome válido!'}
                        titleButton='Ok'
                        buttonColor={'#292b2c'}
                        jsonPath={error}
                    />
                }
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={selectionModal}
            >
                <TouchableWithoutFeedback onPress={() => setSelectionModal(false)}>
                    <View style={styles.offset} />
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <View style={styles.selectionModal}>
                        <Text style={styles.textInfo}>Você deseja pesquisar por?</Text>
                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 5 }}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <ActionButton
                                onAction={() => {
                                    setType(true)
                                    setVisible(true)
                                }}
                                btnColor='#2a9d8f'
                                title='Depositos'
                                nameIcon='chart-donut'
                            />
                            <ActionButton
                                onAction={() => {
                                    setType(false)
                                    setVisible(true)
                                }}
                                btnColor='#da1e37'
                                title='Retiradas'
                                nameIcon='gauge-full'
                            />
                        </View>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => setSelectionModal(false)}>
                    <View style={styles.offset} />
                </TouchableWithoutFeedback>
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
        margin: 10,
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 10,
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
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: '90%',
        marginTop: 5,
    },
    textInfo: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 17,
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
    },
    selectionModal: {
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
        elevation: 5,
    }
})
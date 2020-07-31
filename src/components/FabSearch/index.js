import React, { useState } from 'react'
import { View, Modal, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FAB } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function FabSearch(
    {
        getValor, onOpen, styleFab, mainIcon, mainIconColor, icon1, label1, color1, icon2, label2, color2
    }) {

    //Fab button
    const [state, setState] = useState({ open: false })
    const onStateChange = ({ open }) => setState({ open })
    const { open } = state

    const [isVisible, setVisible] = useState(false)
    const [value, setValue] = useState()

    return (
        <>
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
                        onPress: () => setVisible(true),
                    },
                    {
                        icon: icon1,
                        label: label1,
                        color: color1,
                        onPress: () => onOpen(),
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
                animationType='slide'
                transparent={true}
                visible={isVisible}
            >
                <View style={styles.container}>
                    <View style={styles.containerModal}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.textInfo}>Buscar pelo valor do depósito</Text>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Icon name='close-circle' size={30} color={'#da1e37'} />
                            </TouchableOpacity>
                        </View>
                        <TextInput style={styles.input}
                            placeholder='Digite a quantidade buscada'
                            autoCorrect={false}
                            autoCapitalize='none'
                            keyboardType='numeric'
                            value={value}
                            autoFocus={true}
                            onChangeText={setValue}
                        />

                        <TouchableOpacity
                            style={{ ...styles.button, backgroundColor: '#292b2c' }}
                            onPress={() => {
                                getValor(value)
                                setVisible(false)
                                setValue('')
                            }}
                        >
                            <Text style={styles.btnStyle}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    }
})
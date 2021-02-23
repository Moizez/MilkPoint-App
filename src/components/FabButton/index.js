import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Text, TouchableOpacity, TouchableWithoutFeedback, Animated, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native'

import styles from './styles'

export default function FabButton(props) {

    const navigation = useNavigation()

    const [open, setOpen] = useState(false)
    const [animation] = useState(new Animated.Value(0))
    const [modalVisible, setModalVisible] = useState(false)
    const [quantidade, setQuantidade] = useState()

    const toggleMenu = () => {
        var toValue = open ? 0 : 1

        Animated.spring(animation, {
            toValue: toValue,
            friction: 5
        }).start()

        setOpen(!open)
    }

    const rotation = {
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "45deg"]
                })
            }
        ]
    }

    const homeStyle = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -50]
                })
            }
        ]
    }

    const heartStyle = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -100]
                })
            }
        ]
    }

    return (
        <View style={[styles.container, props.style]} >

            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <KeyboardAvoidingView style={styles.modalBox}>
                        <View style={styles.boxInput}>
                            <Text style={{
                                color: '#FFF',
                                fontSize: 18,
                                marginBottom: 15
                            }}
                            >Digite a quatidade que irá depositar:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Quantidade em litros (L)'
                                autoCorrect={false}
                                autoCapitalize='none'
                                keyboardType='numeric'
                                value={quantidade}
                                onChangeText={(quantidade) => setQuantidade(quantidade)}
                            />

                            <View style={styles.btnView}>
                                <View style={styles.btnConfirm}>
                                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                        <Text style={styles.btn}>Confirmar</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.btnCancel}>
                                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                        <Text style={styles.btn}>Cancelar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </KeyboardAvoidingView>
                </View>

            </Modal>

            <TouchableWithoutFeedback onPress={() => { navigation.navigate('Home') }}>
                <Animated.View style={[styles.button, styles.subMenuUm, heartStyle]}>
                    <Icon
                        name="home"
                        size={20}
                        color="#FFF"
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => { setModalVisible(!modalVisible) }}>
                <Animated.View style={[styles.button, styles.subMenuDois, homeStyle]}>
                    <Icon
                        name="level-up-alt"
                        size={20}
                        color="#FFF"
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={toggleMenu}>
                <Animated.View style={[styles.button, styles.menu, rotation]}>
                    <Icon
                        name="plus"
                        size={22}
                        color="#FFF"
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
}

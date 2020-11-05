import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import LottieView from 'lottie-react-native'

import ActionButton from '../ActionButton'

const AlertErrorSuccess = ({ message, jsonPath, onClose }) => {

    return (
        <>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.offset} />
            </TouchableWithoutFeedback>
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <View style={{ width: '50%', height: 55 }}>
                        <LottieView source={jsonPath} autoPlay loop />
                    </View>
                    <Text style={styles.textStyle}>{message}</Text>

                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 10 }}></View>

                    <ActionButton
                        onAction={onClose}
                        btnColor='#292b2c'
                        nameIcon='check-circle'
                        btnSize={'100%'}
                        btnAlign={'center'}
                    />

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
        alignContent: 'center',
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalContainer: {
        width: '70%',
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
    button: {
        backgroundColor: '#292b2c',
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: '100%',
        marginTop: 10,
    },
    textStyle: {
        color: '#000',
        textAlign: 'center',
        fontSize: 17,
        marginTop: 20,
    },
})

export default AlertErrorSuccess
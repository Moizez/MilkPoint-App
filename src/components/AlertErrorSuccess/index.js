import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native'

const AlertErrorSuccess = ({ title, message, buttonColor, titleButton, jsonPath, onClose }) => {

    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>{title}</Text>
                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 10 }}></View>
                <View style={{ width: '50%', height: 70 }}>
                    <LottieView source={jsonPath} autoPlay loop />
                </View>
                <Text style={styles.textStyle}>{message}</Text>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd', marginVertical: 10 }}></View>

                <TouchableOpacity
                    style={{ ...styles.button, backgroundColor: buttonColor }}
                    onPress={onClose}
                >
                    <Text style={styles.textButton}>{titleButton}</Text>

                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flex: 1,
    },
    modalContainer: {
        width: '80%',
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
        fontSize: 20,
        marginTop: 20,
    },
    textButton: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
    },
    modalTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 3.85,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 5
    }
})

export default AlertErrorSuccess